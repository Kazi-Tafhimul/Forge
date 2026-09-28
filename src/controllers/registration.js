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
      const password = result.password;
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
      handleError(error, response);
    }
  });
}
module.exports = registrationController;
