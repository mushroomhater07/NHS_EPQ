const mysql = require('mysql2');
require('dotenv').config();
module.exports = mysql.createConnection({
  host: process.env.HOST1,
  port: process.env.PORT1,
  user: process.env.USER1,
  password: process.env.PASS1,
  database: process.env.DTBS1,
  multipleStatements: true,
  debug: false,
})
//options: {
//     encrypt: false
// }

// function connect(sql) {
//   var con = mysql.createConnection();
//   con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected to database");
//       con.query(sql,function (err, result, fields) {
//         if (err) {console.log(err);return String("false");}//throw err;
//         return JSON.stringify(result);
//       });
