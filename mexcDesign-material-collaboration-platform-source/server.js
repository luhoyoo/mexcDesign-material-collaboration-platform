const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const DEFAULT_OPENAI_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const MYMEMORY_LANGUAGE_CODES = {
  ar: "ar",
  de: "de",
  en: "en",
  es: "es",
  fa: "fa",
  fil: "tl",
  fr: "fr",
  id: "id",
  it: "it",
  ja: "ja",
  pt: "pt",
  ru: "ru",
  th: "th",
  tr: "tr",
  uk: "uk",
  vi: "vi",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW",
};

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

async function readProjects() {
  try {
    const content = await fs.readFile(PROJECTS_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeProjects(projects) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

function createProjectId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function projectSummary(project) {
  return {
    id: project.id,
    name: project.name,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON in model response");
  }
  return JSON.parse(text.slice(start, end + 1));
}

async function translateWithMyMemory(text, languageCode) {
  const targetCode = MYMEMORY_LANGUAGE_CODES[languageCode] || languageCode;
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `en|${targetCode}`);

  const apiResponse = await fetch(url);
  const data = await apiResponse.json();
  const translatedText = data.responseData?.translatedText;

  if (!apiResponse.ok || !translatedText || data.responseStatus >= 400) {
    throw new Error(data.responseDetails || "MyMemory translation failed");
  }

  return translatedText;
}

async function translateWithOpenAI(payload) {
  const apiKey = payload.apiKey || process.env.OPENAI_API_KEY;
  const model = payload.model || DEFAULT_MODEL;
  const apiBaseUrl = (payload.apiBaseUrl || DEFAULT_OPENAI_URL).replace(/\/$/, "");

  if (!apiKey) {
    return {
      status: 503,
      body: { error: "Translation API key is not set" },
    };
  }

  const prompt = [
    "Translate the poster material from English into the requested language.",
    "Keep MEXC, campaign names, product names, numbers, currency, and season codes unchanged unless grammar requires spacing.",
    "Return strict JSON only with keys title and subtitle.",
    `Target language: ${payload.language}`,
    `Title: ${payload.title}`,
    `Subtitle: ${payload.subtitle}`,
  ].join("\n");

  const apiResponse = await fetch(`${apiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "You are a careful marketing localization translator. Return only JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!apiResponse.ok) {
    return {
      status: apiResponse.status,
      body: { error: await apiResponse.text() },
    };
  }

  const data = await apiResponse.json();
  const parsed = extractJson(data.choices?.[0]?.message?.content || "{}");
  return {
    status: 200,
    body: {
      title: parsed.title,
      subtitle: parsed.subtitle,
    },
  };
}

async function translateMaterial(payload) {
  if ((payload.provider || "mymemory") === "openai") {
    return translateWithOpenAI(payload);
  }

  try {
    const titleSource = payload.titleMode === "compact"
      ? compactSourceTitle(payload.title)
      : payload.title;
    const [title, subtitle] = await Promise.all([
      translateWithMyMemory(titleSource, payload.code),
      translateWithMyMemory(payload.subtitle, payload.code),
    ]);

    return {
      status: 200,
      body: { title, subtitle },
    };
  } catch (error) {
    return {
      status: 502,
      body: { error: error.message },
    };
  }
}

function compactSourceTitle(title) {
  return title
    .replace(/\bEquip the\b/gi, "Equip")
    .replace(/\bwith the\b/gi, "with")
    .replace(/\bfor the\b/gi, "for")
    .replace(/\s+/g, " ")
    .trim();
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(ROOT, pathname));

  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === "GET" && url.pathname === "/healthz") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "POST" && request.url === "/api/translate") {
      const payload = await readBody(request);
      const result = await translateMaterial(payload);
      sendJson(response, result.status, result.body);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/projects") {
      const projects = await readProjects();
      sendJson(response, 200, projects.map(projectSummary));
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/projects") {
      const payload = await readBody(request);
      const now = new Date().toISOString();
      const project = {
        id: createProjectId(),
        name: payload.name || "未命名项目",
        createdAt: now,
        updatedAt: now,
        data: payload.data || {},
      };
      const projects = await readProjects();
      projects.unshift(project);
      await writeProjects(projects);
      sendJson(response, 200, project);
      return;
    }

    const projectMatch = url.pathname.match(/^\/api\/projects\/([^/]+)$/);
    if (projectMatch && request.method === "GET") {
      const projects = await readProjects();
      const project = projects.find((item) => item.id === projectMatch[1]);
      sendJson(response, project ? 200 : 404, project || { error: "Project not found" });
      return;
    }

    if (projectMatch && request.method === "PUT") {
      const payload = await readBody(request);
      const projects = await readProjects();
      const projectIndex = projects.findIndex((item) => item.id === projectMatch[1]);
      if (projectIndex === -1) {
        sendJson(response, 404, { error: "Project not found" });
        return;
      }
      projects[projectIndex] = {
        ...projects[projectIndex],
        name: payload.name || projects[projectIndex].name,
        updatedAt: new Date().toISOString(),
        data: payload.data || {},
      };
      await writeProjects(projects);
      sendJson(response, 200, projects[projectIndex]);
      return;
    }

    await serveStatic(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Poster generator running at http://${HOST}:${PORT}`);
});
