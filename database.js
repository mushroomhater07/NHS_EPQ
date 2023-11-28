const mysql = require('mysql2');
module.exports = mysql.createConnection({
    host: "php.shalevportal.eu.org",
      port: 2086,
      user: "github",
      password: "Ss123456789*",
      database: 'blockchain',
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
