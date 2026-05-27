const { readBody, rejectMethod, sendJson } = require("../../lib/http");
const { getProject, saveProject } = require("../../lib/vercel-project-store");

module.exports = async function handler(request, response) {
  if (rejectMethod(request, response, ["GET", "PUT"])) {
    return;
  }

  try {
    const project = await getProject(String(request.query.id || ""));
    if (!project) {
      sendJson(response, 404, { error: "Project not found" });
      return;
    }

    if (request.method === "GET") {
      sendJson(response, 200, project);
      return;
    }

    const payload = await readBody(request);
    const updatedProject = {
      ...project,
      name: payload.name || project.name,
      updatedAt: new Date().toISOString(),
      data: payload.data || {},
    };
    await saveProject(updatedProject);
    sendJson(response, 200, updatedProject);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
};
