var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

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
  connection.query(sql, function(err, rows, field) {
  	if(err) {
  		console.log(err);
      connection.end();
  	} else {
  		connection.end();
  		console.log(rows[0]);
      if (rows[0] && rows[0].password == req.body.password) {
        var redirectPath = '/personal/' + rows[0].id;
        res.redirect(redirectPath); 
      } else {
        res.render('/login', {errorText: 'Ошибка авторизации'});
      }
  	}
  });
});
module.exports = router;