var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  var connection = mysql.createConnection({
  	host:'localhost', 
  	user:'root',
  	password: '1',
  	database: 'iq_server'
  });
  connection.connect();
  var sql = "INSERT INTO user (login, password) VALUES ?"
  var values=[[req.body.login, req.body.password]];
  connection.query(sql,[values],function(err,rows,field){
  	if(err){
  		console.log(err);
  	}else{
  		connection.end();
  		res.send('OK');
  	}
  });
});
module.exports = router;