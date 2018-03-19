const mysql = require("mysql");
exports.getConnection = function() {
  let connection = mysql.createConnection({
    host: "localhost",
    database: "safety",
    user: "root",
    password: ""
  });
  connection.connect();
  return connection;
};
