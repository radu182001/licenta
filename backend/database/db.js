const Pool = require("pg").Pool;
const config = require("config");

const pool = new Pool({
  user: "postgres",
  host: config.get("db_host"),
  database: "licentaDB",
  password: config.get("db_password"),
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
