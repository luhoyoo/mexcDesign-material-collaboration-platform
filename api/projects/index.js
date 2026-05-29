const { readBody, rejectMethod, sendJson } = require("../../lib/http");
const {
  createProjectId,
  listProjects,
  projectSummary,
  saveProject,
} = require("../../lib/project-store");

module.exports = async function handler(request, response) {
  if (rejectMethod(request, response, ["GET", "POST"])) {
    return;
  }

  try {
    if (request.method === "GET") {
      const projects = await listProjects();
      sendJson(response, 200, projects.map(projectSummary));
      return;
    }

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
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
};
