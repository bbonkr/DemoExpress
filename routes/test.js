var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user:'bbon',
	password:'7272',
	database:'testdb'
});

router.get('/',function(req, res, next){
	res.render('test', {title : 'Test', message : 'tester!'});
});

router.get('/Users',function(req, res, next){
	var id = req.query.id;
	var name = '';
	var password = '';

	if(!id){ id = '';}

	var query = connection.query('select id, name, password from users where id = ?', [id], function(err, rows){
		if(rows.length > 0){
			id = rows[0]['id'];
			name = rows[0]['name'];
			password = rows[0]['password'];
		}
		res.render('test/Users', {title : 'Test', message : 'tester!', data_id:id, data_name:name, data_password:password });
	});	
});

router.post('/Users', function(req, res, next){
	var user = {
		'id':req.body.id,
		'name' : req.body.name,
		'password' : req.body.password
		};
	var strQuery = '';
	var parameter = [];
	if(checkUserIsExsits(id)){
		// update
		strQuery = 'update Users set name = ?, password = ? where id = ?';
		parameter = [user.name, user.password, user.id];
	}
	else{
		// insert 
		strQuery = 'insert into Users (id, name, password) values (?, ?, ?)';
		parameter = [user.id, user.name, user.password];
	}

	var query = connection.query(
		strQuery, 
		parameter,
		function(err, result){
			if(err){
				console.log(err);
				throw err;
			}
			console.log(query);
			res.redirect('./list');
			res.end();
		});
});

router.get('/list',function(req, res, next){
	res.render('test/list');
});

router.get('/json', function(req, res, next){
	var query = connection.query('select id, name, \'******\' password from Users',function(err, rows){
		console.log(rows);
		res.json({result:'', Rows:rows});
	});
	console.log(query);	
});

router.get('/checkid', function(req, res, next){
	var id = req.query.id;
	var user = checkUserIsExsits(id);
	res.json({result : (user == null)});
});


var checkUserIsExsits = function(id){
	var query = connection.query('select id, name, password from users where id = ?', [id], function(err, rows){
		if(rows.length > 0){
			return {
			id : rows[0]['id'],
			name : rows[0]['name'],
			password : rows[0]['password']	
			};
		}
		else{
			return null;
		}
	});	
}

module.exports = router;