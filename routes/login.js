var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
router.post('/', function(req, res, next) {
  var connection = mysql.createConnection({
  	host:'localhost', 
  	user:'root',
  	password: '1',
  	database: 'iq_server'
  });
  connection.connect();
  var sql = 'SELECT * FROM user WHERE e_mail = \'' + req.body.login + '\'';
  console.log(sql);
  connection.query(sql,function(err,rows,field){
  	if(err){
  		console.log(err);
  	}else{
  		connection.end();
  		console.log(rows[0]);
      res.render('personal', { name: rows[0].name, surname: rows[0].surname, birthdate: rows[0].birthdate.toLocaleDateString('en-GB'), e_mail: rows[0].e_mail, phone: rows[0].phone || 'Номер телефона'});
  	}
  });
});
module.exports = router;