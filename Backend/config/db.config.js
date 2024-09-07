//import the mysql module promise wrapper
const mysql = require("mysql2/promise");
// prepare the connection to parameters we use to connect to the database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: process.env.DB_SOCKET,
  connectionLimit: 10,
  multipleStatements: true,
};
// Create the connection pool
const pool = mysql.createPool(dbConfig);
// Prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}
// Export the query function for use in the application
module.exports = { query };
