const pool = require("../db");

async function getUsers() {
  const result = await pool.query("select * from users");
  return result.rows;
}
async function createUser(username, email, passwordHash) {
  const result = await pool.query(
    "INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email",
    [username, email, passwordHash],
  );

  return result.rows[0];
}
async function findUserByEmail(email){
  const result = await pool.query("select user_id, username, email, password_hash from users where email = $1", [email])
  return result.rows[0]
}
module.exports = {
  getUsers,
  createUser,
  findUserByEmail
};
