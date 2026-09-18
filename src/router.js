const fs = require("fs");
const path = require("path");
const { userHandler, userHandlerById } = require("./handlers");
function router(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });

    response.end("Welcome to Forge");
  } else if (request.method === "GET" && url.pathname === "/index.html") {
    const pathName = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(pathName, (error, data) => {
      if (error) {
        if (error.code === "ENOENT") {
          response.writeHead(404, {
            "Content-Type": "text/html",
          });
          response.end("No file found");
        } else {
          response.writeHead(500, {
            "Content-Type": "text/html",
          });
          response.end("Server error");
        }
        return;
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html",
        });
        response.end(data);
      }
    });
  } else if (request.method === "GET" && url.pathname === "/users") {
    userHandler(request, response);
  } else if (request.method === "GET" && url.pathname.startsWith("/users/")) {
    const parts = url.pathname.split("/");
    const userId = parts[2];
    userHandlerById(request, response, userId);
  } else if (request.method === "GET" && url.pathname === "/projects") {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });

    response.end("Projects page");
  } else if (request.method === "POST" && url.pathname === "/users") {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    request.on("end", () => {
      const body = Buffer.concat(chunks).toString();
      response.writeHead(200, {
        "Content-Type": "application/json",
      });
      const result = JSON.parse(body);
      response.end(JSON.stringify(result));
    });
  } else {
    response.writeHead(404, {
      "Content-Type": "text/plain",
    });

    response.end("Not Found");
  }
}

module.exports = router;
