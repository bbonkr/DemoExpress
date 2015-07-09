var express = require('express');
var router = express.Router();
var connection = require('../library/connection.js');



router.get('/',function(req, res, next){
	res.render('test', {
		title : 'Express', 
		subtitle:'',
		message : 'tester!'
	});
});

router.get('/Users',function(req, res, next){
	console.log(req.query);

	var id = req.query.id;
	var task = '';

	var name = '';
	var password = '';
	var canDelete = 'disabled';

	if(!id){ id = '';}	

	task = (id == '') ? 'c' : 'u';

	var query = connection.query('select id, name, password from users where id = ?', [id], function(err, rows){
		
		if(err){
			res.render('error', {error : err});
		}
		else{		
			if(rows.length > 0){
				id = rows[0]['id'];
				name = rows[0]['name'];
				password = rows[0]['password'];
				canDelete = '';
			}
			res.render('test/Users', 
				{
					data : {
								id:id, 
								name:name, 
								password:password,
								can_delete:canDelete,
								task:(rows.length > 0 ? 'u' : 'c')
							},
					title:'Express',
					subtitle : task == 'c' ? 'Add user' : 'Edit ' + name
				});
		}
	});	
});

router.post('/Users', function(req, res, next){
	console.log(req.body);

	var user = {
		'id':req.body.id,
		'name' : req.body.name,
		'password' : req.body.password
		};
	var strQuery = '';
	var parameter = [];

	if(found_user == null){
		// insert 
		strQuery = 'insert into Users (id, name, password) values (?, ?, ?)';
		parameter = [user.id, user.name, user.password];
	}
	else{
		// update
		strQuery = 'update Users set name = ?, password = ? where id = ?';
		parameter = [user.name, user.password, user.id];
	}

	console.log(strQuery);

	var query = connection.query(
		strQuery, 
		parameter,
		function(err, result){
			if(err){
				console.log(err);
				throw err;
			}
			//console.log(query);
			res.redirect('./list');
			res.end();
		});
});

router.post('/add', function(req, res, next){
	var user = {
		'id':req.body.id,
		'name' : req.body.name,
		'password' : req.body.password
		};
	var strQuery = '';
	var parameter = [];

	// insert 
	strQuery = 'insert into Users (id, name, password) values (?, ?, ?)';
	parameter = [user.id, user.name, user.password];

	var query = connection.query(
		strQuery, 
		parameter,
		function(err, result){
			if(err){
				console.log(err);
				throw err;
			}
			//console.log(query);
			res.redirect('./list');
			res.end();
		});	
});

router.post('/edit', function(req, res, next){
	var user = {
		'id':req.body.id,
		'name' : req.body.name,
		'password' : req.body.password
		};
	var strQuery = '';
	var parameter = [];

	// update
	strQuery = 'update Users set name = ?, password = ? where id = ?';
	parameter = [user.name, user.password, user.id];
	
	var query = connection.query(
		strQuery, 
		parameter,
		function(err, result){
			if(err){
				console.log(err);
				throw err;
			}
			
			res.redirect('./list');
			res.end();
		});
});

// 사용자 삭제
router.post('/delete', function(req, res, next){
	var id = req.body.id;
	var strQuery = 'delete from Users where id = ?';
	var query = connection.query(
			strQuery,
			[id],
			function(err, result){
				if(err){
					console.log(err);
					throw err;
				}
				console.log(query);
				res.redirect('./list');
				res.end();
			}
		);
});

router.get('/list',function(req, res, next){
	res.render('test/list',{
		title:'Express',
		subtitle:'User List'
	});
});

router.get('/json', function(req, res, next){
	
	var p_page = req.query['page'];
	var p_rows = req.query['rows'];
	var p_sidx = req.query['sidx'];
	var p_sord = req.query['sord'];

	var queryString = '';
	var queryString2 = '';

	if(!p_page){ p_page = 1; }

	var start_idx = (p_page - 1) * p_rows;

	queryString += 'select id, name, \'******\' password from Users ';
	
	if (p_sidx){
		queryString += 'order by ' + p_sidx;
		if(!p_sord){
			p_sord = 'asc';
		}
		queryString += ' ' + p_sord;
	}

	queryString +=' limit '+ start_idx + ',' + p_rows;
	queryString2 += 'select count(*) total from Users';
	
	connection.query(queryString, function(err1, result1){
		connection.query(queryString2, function(err2, result2){
			if(err1 || err2){
				res.json({result:'error', Rows:[], Total:0, Records:0, message:'Occured error'});	
			}else{
				res.json({result:'', Rows:result1, Total:result2[0]['total'], Records:0});
			}
		});
	});
});

router.get('/checkid', function(req, res, next){
	var id = req.query.id;
	connection.query(
		'select id, name, password from users where id = ?', 
		[id], 
		function(err, rows){
			
			if(rows.length > 0){
				var user = {
					id:rows[0]['id'], 
					name : rows[0]['name'],
					password : rows[0]['password']
				};
				console.log('user');
				console.log(user);
				res.json( {
					result:false, 
					data: user
				});
			}
			else{
				res.json( {
					result:true,
					data:null
				});
			}			
		});		
});


module.exports = router;