const { readBody, rejectMethod, sendJson } = require("../../lib/http");
const { listProjects, saveProject } = require("../../lib/vercel-project-store");

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
