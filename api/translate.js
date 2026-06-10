const { createRateLimiter, readBody, rejectMethod, sendJson } = require("../lib/http");
const { translateMaterial } = require("../lib/translation");

const limitTranslate = createRateLimiter({ windowMs: 60_000, max: 30 });

module.exports = async function handler(request, response) {
  if (rejectMethod(request, response, ["POST"])) {
    return;
  }

  try {
    if (!limitTranslate(request)) {
      sendJson(response, 429, { error: "请求过于频繁，请稍后重试。" });
      return;
    }
    const payload = await readBody(request, { limitBytes: 1024 * 1024 });
    const result = await translateMaterial(payload);
    sendJson(response, result.status, result.body);
  } catch (error) {
    sendJson(response, error.status || 500, { error: error.message });
  }
};
