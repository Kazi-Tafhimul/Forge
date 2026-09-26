const pool = require("../db");

 async function getUsers(){
    const result = await pool.query("select * from users");
    return result.rows;
}
module.exports = getUsers;