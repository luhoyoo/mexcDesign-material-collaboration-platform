const PROJECT_PREFIX = "poster-projects/";

async function getBlobSdk() {
  return import("@vercel/blob");
}

function projectPath(id) {
  if (!/^[a-z0-9-]+$/i.test(id)) {
    throw new Error("Invalid project id");
  }
  return `${PROJECT_PREFIX}${id}.json`;
}

async function readJsonBlob(pathname) {
  const { get } = await getBlobSdk();
  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) {
    return null;
  }
  return new Response(result.stream).json();
}

async function listProjects() {
  const { list } = await getBlobSdk();
  const blobs = [];
  let cursor;
  let hasMore = true;

  while (hasMore) {
    const page = await list({
      cursor,
      limit: 1000,
      prefix: PROJECT_PREFIX,
    });
    blobs.push(...page.blobs.filter((blob) => blob.pathname.endsWith(".json")));
    cursor = page.cursor;
    hasMore = page.hasMore;
  }

  const projects = (await Promise.all(
    blobs.map((blob) => readJsonBlob(blob.pathname)),
  )).filter(Boolean);

  return projects.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

async function getProject(id) {
  return readJsonBlob(projectPath(id));
}

async function saveProject(project) {
  const { put } = await getBlobSdk();
  await put(projectPath(project.id), JSON.stringify(project), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });
  return project;
}

module.exports = {
  getProject,
  listProjects,
  saveProject,
};
