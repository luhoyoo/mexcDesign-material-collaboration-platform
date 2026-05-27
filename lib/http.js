function sendJson(response, status, data) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(data));
}

async function readBody(request) {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body || "{}");
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function rejectMethod(request, response, allowedMethods) {
  if (allowedMethods.includes(request.method)) {
    return false;
  }

  response.setHeader("Allow", allowedMethods.join(", "));
  sendJson(response, 405, { error: "Method not allowed" });
  return true;
}

module.exports = {
  readBody,
  rejectMethod,
  sendJson,
};
