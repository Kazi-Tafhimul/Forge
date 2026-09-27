const pool = require("../db");
const handleError = require("../error-handler");

async function projectHandler(request, response) {
  try {
    const result = await pool.query(
      "select p.project_name, w.workname from projects as p inner join workspaces as w on p.workspace_id = w.workspace_id",
    );

    response.writeHead(200, {
      "Content-Type": "application/json",
    });

    response.end(JSON.stringify(result.rows));
  } catch (error) {
    handleError(error, response);
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
    handleError(error, response);
  }
}

module.exports = {
  projectHandler,
  workspaceProjectCounts,
};