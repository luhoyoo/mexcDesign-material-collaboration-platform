const { sendJson } = require("../lib/http");

module.exports = function handler(request, response) {
  sendJson(response, 200, { ok: true });
};
