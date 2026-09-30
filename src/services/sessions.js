const crypto = require("crypto");
const {newSession, findSession} = require("../data-access/sessions");


async function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString("hex");

  await newSession(sessionId, userId);
  return sessionId;
}
async function getSession(sessionId) {
  const session = await findSession(sessionId);
  if (!session) {
    return null;
  }
  if (new Date(session.expires_at) < new Date()) {
    return null;
  }

  return session;
}
module.exports = {
  createSession,
  getSession,
};
