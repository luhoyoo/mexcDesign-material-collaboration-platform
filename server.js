const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const { readBody, sendJson } = require("./lib/http");
const { translateMaterial } = require("./lib/translation");
const {
  createProjectId,
  getProject,
  listProjects,
  projectSummary,
  saveProject,
} = require("./lib/project-store");

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = __dirname;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

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

    if (request.method === "POST" && url.pathname === "/api/translate") {
      const payload = await readBody(request);
      const result = await translateMaterial(payload);
      sendJson(response, result.status, result.body);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/projects") {
      const projects = await listProjects();
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
      await saveProject(project);
      sendJson(response, 200, project);
      return;
    }

    const projectMatch = url.pathname.match(/^\/api\/projects\/([^/]+)$/);
    if (projectMatch && request.method === "GET") {
      const project = await getProject(projectMatch[1]);
      sendJson(response, project ? 200 : 404, project || { error: "Project not found" });
      return;
    }

    if (projectMatch && request.method === "PUT") {
      const payload = await readBody(request);
      const existing = await getProject(projectMatch[1]);
      if (!existing) {
        sendJson(response, 404, { error: "Project not found" });
        return;
      }
      const updated = {
        ...existing,
        name: payload.name || existing.name,
        updatedAt: new Date().toISOString(),
        data: payload.data || {},
      };
      await saveProject(updated);
      sendJson(response, 200, updated);
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
