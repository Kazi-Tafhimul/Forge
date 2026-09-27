const pool = require("./db");
const handleError = require("./error-handler");
const createWorkspace = require("./services/workspaces");

function userHandlerById(request, response, userId) {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end(`User ID: ${userId}`);
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

      const workspace = await createWorkspace(workspace_id, workname, user_id);

      response.writeHead(201, {
        "Content-Type": "application/json",
      });

      response.end(JSON.stringify(workspace));
    } catch (error) {
      handleError(error, response);
    }
  });
}
module.exports = {
  userHandlerById,

  createWorkSpace,
};
