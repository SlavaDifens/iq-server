var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  var connection = mysql.createConnection({
  	host:'localhost', 
  	user:'root',
  	password: '1',
  	database: 'iq_server'
  });
  connection.connect();
  console.log(req.body);
  var sql = "INSERT INTO user (password, name, surname, phone, birthdate, e_mail) VALUES ?"
  var birthdate = new Date(Date.UTC(req.body.year, req.body.month, req.body.day, 0, 0, 0));
  console.log(birthdate);
  var values = [[req.body.password, req.body.firstname, req.body.secondname, req.body.tel, birthdate, req.body.email]];
  connection.query(sql,[values],function(err,rows,field){
  	if(err){
  		console.log(err);
  	}else{
  		connection.end();
  		res.render('personal', { name: req.body.firstname, surname: req.body.secondname, birthdate: birthdate.toLocaleDateString('en-GB'), e_mail: req.body.email, phone: req.body.tel || 'Номер телефона'});
  	}
  });
});


module.exports = router;