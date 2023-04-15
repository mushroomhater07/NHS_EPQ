const mysql = require('mysql2');
module.exports = mysql.createConnection({
    host: "fact.shalevportal.ml",
      port: 2086,
      user: "hey",
      password: "Ss12345678*",
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