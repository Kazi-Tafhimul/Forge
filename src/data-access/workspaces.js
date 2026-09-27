async function createWorkspace(client, workspace_id, workname) {
  await client.query(
    "INSERT INTO workspaces (workspace_id, workname) VALUES ($1, $2)",
    [workspace_id, workname],
  );
}

async function addWorkspaceMember(client, user_id, workspace_id) {
  await client.query(
    "INSERT INTO workspace_members (user_id, workspace_id) VALUES ($1, $2)",
    [user_id, workspace_id],
  );
}

module.exports = {
  createWorkspace,
  addWorkspaceMember,
};