const getUsers = require("../data-access/users");

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
module.exports = userHandler;