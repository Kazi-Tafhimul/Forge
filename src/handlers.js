const pool = require("./db");

async function userHandler(request, response) {
  try{
    const result = await pool.query(
      "select * from users"
    );
    response.writeHead(200, {
    "Content-Type": "application/json",
  });

  response.end(JSON.stringify(result.rows));

  }
  catch(error){
    console.error(error)
    response.writeHead(500, {
      "Content-Type":"application/json"
    });
    response.end(JSON.stringify({
      error:"Internal server error"
    }))
  }

  
}
function userHandlerById(request, response, userId) {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end(`User ID: ${userId}`);
}
module.exports = {
    userHandler, userHandlerById
}
