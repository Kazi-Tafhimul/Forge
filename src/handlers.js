function userHandler(request, response) {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  response.end(
    JSON.stringify({
      message: "Users page",
    }),
  );
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
