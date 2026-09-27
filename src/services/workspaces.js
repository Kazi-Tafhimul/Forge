const pool = require("../db");
const {
  createWorkspace,
  addWorkspaceMember,
} = require("../data-access/workspaces");

async function createWorkSpace(workspace_id, workname, user_id) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await createWorkspace(client, workspace_id, workname);

    await addWorkspaceMember(client, user_id, workspace_id);

    await client.query("COMMIT");

    return {
      workspace_id,
      workname,
      user_id,
    };
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
module.exports = createWorkSpace;
