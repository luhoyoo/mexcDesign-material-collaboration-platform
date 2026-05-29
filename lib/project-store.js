function pickBackend() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return require("./vercel-project-store");
  }
  return require("./file-project-store");
}

const backend = pickBackend();

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

module.exports = {
  ...backend,
  createProjectId,
  projectSummary,
};
