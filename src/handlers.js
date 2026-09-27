const pool = require("./db");
const createWorkspace = require("./services/workspaces");

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
    try {
      const body = Buffer.concat(chunks).toString();
      const data = JSON.parse(body);

      const workspace_id = data.workspace_id;
      const workname = data.workname;
      const user_id = data.user_id;

      await createWorkspace(workspace_id, workname, user_id);

      response.writeHead(200, {
        "Content-Type": "text/plain",
      });

      response.end("Workspace created successfully");
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
  });
}
module.exports = {
  userHandlerById,
  projectHandler,
  workspaceProjectCounts,
  createWorkSpace,
};
