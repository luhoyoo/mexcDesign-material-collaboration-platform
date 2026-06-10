const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const DEFAULT_OPENAI_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const MYMEMORY_LANGUAGE_CODES = {
  ar: "ar",
  de: "de",
  el: "el",
  en: "en",
  es: "es",
  et: "et",
  fa: "fa",
  fil: "tl",
  fi: "fi",
  fr: "fr",
  id: "id",
  it: "it",
  ja: "ja",
  kk: "kk",
  ms: "ms",
  nl: "nl",
  pl: "pl",
  pt: "pt",
  ru: "ru",
  sv: "sv",
  th: "th",
  tr: "tr",
  "tr-CT": "tr",
  uk: "uk",
  vi: "vi",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW",
};

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
    "Return strict JSON only with keys title, subtitle, and tag.",
    `Target language: ${payload.language}`,
    `Title: ${payload.title}`,
    `Subtitle: ${payload.subtitle}`,
    `Tag: ${payload.tag || ""}`,
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
      tag: parsed.tag,
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
    const [title, subtitle, tag] = await Promise.all([
      translateWithMyMemory(titleSource, payload.code),
      translateWithMyMemory(payload.subtitle, payload.code),
      translateWithMyMemory(payload.tag || "", payload.code),
    ]);

    return {
      status: 200,
      body: { title, subtitle, tag },
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

module.exports = { translateMaterial };
