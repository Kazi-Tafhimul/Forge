const getUsers = require("./data-access/users");
const pool = require("./db");

async function userHandler(request, response) {
  try {
   const result = await getUsers();
    response.writeHead(200, {
      "Content-Type": "application/json",
    });

    response.end(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    response.writeHead(500, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({
        error: "Internal server error",
      }),
    );
  }
}
function userHandlerById(request, response, userId) {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end(`User ID: ${userId}`);
}
async function projectHandler(request, response) {
  try {
    const result = await pool.query(
      " select p.project_name, w.workname from projects as p inner join workspaces as w on p.workspace_id = w.workspace_id",
    );
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify(result.rows));
  } catch (error) {
    console.error(error);
    response.writeHead(500, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({
        error: "Internal server error",
      }),
    );
  }
}
async function workspaceProjectCounts(request, response) {
  try {
    const result = await pool.query(
      "select w.workname, count(p.project_id) as project_count from workspaces as w left join projects as p on p.workspace_id = w.workspace_id group by w.workname",
    );
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify(result.rows));
  } catch (error) {
    console.error(error);
    response.writeHead(500, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({
        error: "Internal server error",
      }),
    );
  }
}
async function createWorkSpace(request, response) {
  const chunks = [];

  request.on("data", (chunk) => {
    chunks.push(chunk);
  });

  request.on("end", async () => {
    let client;

    try {
      const body = Buffer.concat(chunks).toString();
      const data = JSON.parse(body);

      const workspace_id = data.workspace_id;
      const workname = data.workname;
      const user_id = data.user_id;

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

      response.writeHead(200, {
        "Content-Type": "text/plain",
      });

      response.end("Workspace created successfully");
    } catch (error) {
      console.error(error);

      if (client) {
        await client.query("ROLLBACK");
      }

      response.writeHead(500, {
        "Content-Type": "application/json",
      });

      response.end(
        JSON.stringify({
          error: "Internal server error",
        }),
      );
    } finally {
      if (client) {
        client.release();
      }
    }
  });
}
module.exports = {
  userHandler,
  userHandlerById,
  projectHandler,
  workspaceProjectCounts,
  createWorkSpace
};
