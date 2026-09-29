const { findUserByEmail } = require("../data-access/users");
const bcrypt = require("bcrypt");

async function loginController(request, response) {
  const chunks = [];

  request.on("data", (chunk) => {
    chunks.push(chunk);
  });

  request.on("end", async () => {
    const body = Buffer.concat(chunks).toString();

    try {
      const result = JSON.parse(body);

      const email = result.email;
      const password = result.password;

      const user = await findUserByEmail(email);

      if (!user) {
        response.writeHead(401, {
          "Content-Type": "application/json",
        });

        response.end(
          JSON.stringify({
            error: "Invalid email or password",
          }),
        );

        return;
      }

      const isValid = await bcrypt.compare(password, user.password_hash);

      if (!isValid) {
        response.writeHead(401, {
          "Content-Type": "application/json",
        });

        response.end(
          JSON.stringify({
            error: "Invalid email or password",
          }),
        );

        return;
      }

      response.writeHead(200, {
        "Content-Type": "application/json",
      });

      response.end(
        JSON.stringify({
          user_id: user.user_id,
          username: user.username,
          email: user.email,
        }),
      );
    } catch (error) {
      console.error(error);

      response.writeHead(400, {
        "Content-Type": "application/json",
      });

      response.end(
        JSON.stringify({
          error: "Invalid email or password",
        }),
      );
    }
  });
}

module.exports = loginController;