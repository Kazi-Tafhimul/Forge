const pool = require("../db");

async function newSession(sessionId, userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await pool.query(
    `insert into sessions (session_id, user_id, expires_at) values ($1, $2, $3)`,
    [sessionId, userId, expiresAt],
  );
}
async function findSession(sessionId) {
  const result = await pool.query(
    `select session_id, user_id, expires_at from sessions where session_id = $1 `,
    [sessionId],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}
module.exports = { newSession, findSession };
