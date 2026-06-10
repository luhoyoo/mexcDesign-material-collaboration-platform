function sendJson(response, status, data) {
  response.statusCode = status;
  setSecurityHeaders(response);
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(data));
}

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "same-origin");
  response.setHeader("Cache-Control", "no-store");
}

function getBodySize(value) {
  return Buffer.byteLength(typeof value === "string" ? value : JSON.stringify(value || {}), "utf8");
}

async function readBody(request, options = {}) {
  const limitBytes = options.limitBytes || 5 * 1024 * 1024;
  if (request.body && typeof request.body === "object") {
    if (getBodySize(request.body) > limitBytes) {
      const error = new Error("Request body too large");
      error.status = 413;
      throw error;
    }
    return request.body;
  }

  if (typeof request.body === "string") {
    if (getBodySize(request.body) > limitBytes) {
      const error = new Error("Request body too large");
      error.status = 413;
      throw error;
    }
    return JSON.parse(request.body || "{}");
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limitBytes) {
      const error = new Error("Request body too large");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function createRateLimiter({ windowMs = 60_000, max = 60 } = {}) {
  const buckets = new Map();
  return function rateLimit(request) {
    const forwardedFor = request.headers["x-forwarded-for"];
    const ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : String(forwardedFor || request.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const now = Date.now();
    const bucket = buckets.get(ip) || { count: 0, resetAt: now + windowMs };
    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }
    bucket.count += 1;
    buckets.set(ip, bucket);
    return bucket.count <= max;
  };
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
  createRateLimiter,
  readBody,
  rejectMethod,
  setSecurityHeaders,
  sendJson,
};
