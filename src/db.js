const { Pool } = require("pg");
const config = require("./config");


const pool = new Pool({
  host:config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password:config.password,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});
module.exports = pool;
