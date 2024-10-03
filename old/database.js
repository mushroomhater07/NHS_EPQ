const mysql = require('mysql2');
module.exports = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
      port: 3306,
      user: "sql7619301",
      password: "2kM3dH4h7x",
      database: 'sql7619301',
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
