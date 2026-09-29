const { createUser } = require("../data-access/users");
const handleError = require("../error-handler");
const hashPassword = require("../services/passwords");

async function registrationController(request, response) {
  const chunks = [];
  request.on("data", (chunk) => {
    chunks.push(chunk);
  });
  request.on("end", async () => {
    const body = Buffer.concat(chunks).toString();

    try {
      const result = JSON.parse(body);
      if (!result.username || !result.email || !result.password) {
        response.writeHead(400, {
          "Content-Type": "application/json",
        });
        response.end(
          JSON.stringify({
            error: "Username, email and password are required",
          }),
        );
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(result.email)) {
        response.writeHead(400, {
          "Content-Type": "application/json",
        });
        response.end(
          JSON.stringify({
            error: "Invalid user email",
          }),
        );
        return;
      }

      const password = result.password;
      if (password.length < 8) {
        response.writeHead(400, {
          "Content-Type": "application/json",
        });
        response.end(
          JSON.stringify({
            error: "Password length must be atleast 8 characters",
          }),
        );
        return;
      }
      const passwordHash = await hashPassword(password);
      const newUser = await createUser(
        result.username,
        result.email,
        passwordHash,
      );
      response.writeHead(201, {
        "Content-Type": "application/json",
      });

      response.end(JSON.stringify(newUser));
    } catch (error) {
      if (error.code === "23505") {
        response.writeHead(409, {
          "Content-Type": "application/json",
        });
        response.end(
          JSON.stringify({
            error: "Username or email already exists",
          }),
        );
        return;
      }
      handleError(error, response);
    }
  });
}
module.exports = registrationController;
