// Import the mysql2 module Promise Wrapper
const mysql = require("mysql2/promise");
// Prepare connection parameters we use to connect to the database
const dbConfig = {
  connectionLimit: 10,
  // socketPath: process.env.DB_SOCKET,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  //waitForConnections: true,
  waitForConnections: true,
};
//create the connection pool
const pool = mysql.createPool(dbConfig);
//Prepare a function that will execute the sql queries asynchrously
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  //return the results
  return rows;
}
//export the query function
module.exports = {
  query,
};
//The above code is a simple wrapper for the mysql module that will allow us to execute queries asynchronously. We have defined a function called query that will execute the queries and return the results. The function will take two parameters, the sql query and the parameters.
// Now let’s create the model for the user.
