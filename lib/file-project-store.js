const fs = require("node:fs/promises");
const path = require("node:path");

const DATA_DIR = path.join(__dirname, "..", "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");

async function readAll() {
  try {
    const content = await fs.readFile(PROJECTS_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeAll(projects) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

async function listProjects() {
  const projects = await readAll();
  return [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

async function getProject(id) {
  const projects = await readAll();
  return projects.find((item) => item.id === id) || null;
}

async function saveProject(project) {
  const projects = await readAll();
  const index = projects.findIndex((item) => item.id === project.id);
  if (index === -1) {
    projects.unshift(project);
  } else {
    projects[index] = project;
  }
  await writeAll(projects);
  return project;
}

module.exports = {
  getProject,
  listProjects,
  saveProject,
};
