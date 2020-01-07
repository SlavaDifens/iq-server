var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.userId)
    res.redirect('/personal/' + req.session.userId)
  else
    res.render('login');
});

router.post('/', function(req, res, next) {
  var connection = mysql.createConnection({
  	host:'localhost', 
  	user:'root',
  	password: '1',
  	database: 'iqserver'
  });
  connection.connect();
  var sql = 'SELECT * FROM user WHERE e_mail = \'' + req.body.login + '\'';
  connection.query(sql, function(err, rows, field) {
  	if(err) {
  		console.log(err);
      connection.end();
  	} else {
  		connection.end();
      if (rows[0] && rows[0].password == req.body.password) {
        req.session.userId = rows[0].id;
        var redirectPath = '/personal/' + rows[0].id;
        res.redirect(redirectPath); 
      } else {
        res.render('/login', {errorText: 'Ошибка авторизации'});
      }
  	}
  });
});
module.exports = router;