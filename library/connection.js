var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user:'bbon',
	password:'7272',
	database:'testdb'
});

module.exports = connection;