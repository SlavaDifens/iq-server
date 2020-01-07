var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('personal');
});

router.get('/:userId', function(req, res, next) {
	var connection = mysql.createConnection({
  	host:'localhost', 
  	user:'root',
  	password: '1',
  	database: 'iqserver'
  });
  connection.connect();
  var sql = 'SELECT * FROM user WHERE id = ' + req.params.userId;
  connection.query(sql, function(err, rows, field) {
  	if(err) {
  		console.log(err);
  	    connection.end();
  	} else {
  		connection.end();
  		res.render('personal', { name: rows[0].name, surname: rows[0].surname, birthdate: rows[0].date.toLocaleDateString('en-GB'), e_mail: rows[0].e_mail, phone: rows[0].phone || 'Номер телефона'});
  	}
  });
});

module.exports = router;