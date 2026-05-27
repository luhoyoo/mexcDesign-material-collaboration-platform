const { readBody, rejectMethod, sendJson } = require("../lib/http");
const { translateMaterial } = require("../lib/translation");

module.exports = async function handler(request, response) {
  if (rejectMethod(request, response, ["POST"])) {
    return;
  }

  try {
    const payload = await readBody(request);
    const result = await translateMaterial(payload);
    sendJson(response, result.status, result.body);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
};
