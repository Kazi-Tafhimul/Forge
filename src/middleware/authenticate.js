const { getSession } = require("../services/sessions");

async function authenticate(request, response, next) {
  const cookieHeader = request.headers.cookie;

  if (!cookieHeader) {
    response.writeHead(401, {
      "Content-Type": "application/json",
    });

    return response.end(
      JSON.stringify({
        error: "Unauthorized: No session provided",
      }),
    );
  }

  const cookies = cookieHeader.split(";");

  let sessionId;

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");

    if (name === "sessionId") {
      sessionId = value;
      break;
    }
  }

  if (!sessionId) {
    response.writeHead(401, {
      "Content-Type": "application/json",
    });

    return response.end(
      JSON.stringify({
        error: "Unauthorized: No session provided",
      }),
    );
  }

  const session = await getSession(sessionId);

  if (!session) {
    response.writeHead(401, {
      "Content-Type": "application/json",
    });

    return response.end(
      JSON.stringify({
        error: "Unauthorized: Invalid or expired session",
      }),
    );
  }

  request.user = {
    sessionId: session.session_id,
    userId: session.user_id,
  };

  next();
}

module.exports = authenticate;