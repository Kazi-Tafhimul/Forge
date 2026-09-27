const pool = require("../db");

async function createWorkSpace(workspace_id, workname, user_id) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await client.query(
      "INSERT INTO workspaces (workspace_id, workname) VALUES ($1, $2)",
      [workspace_id, workname],
    );
    await client.query(
      "INSERT INTO workspace_members (user_id, workspace_id) VALUES ($1, $2)",
      [user_id, workspace_id],
    );

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
