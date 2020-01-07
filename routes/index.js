var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var connection = mysql.createConnection({
	  	host:'localhost', 
	  	user:'root',
	  	password: '1',
	  	database: 'iqserver'
  	});
  	connection.connect();
  	var sql = 'SELECT * FROM news';
  	connection.query(sql, function(err, rows, field) {
  		if(err) {
  			console.log(err);
      		connection.end();
  		} else {
  			if (req.session.userId)
  			{
  				console.log(rows);
  				res.render('index', { rows: rows} );
  			}  				
  			else
  				res.render('index', { rows: []} );
  		}
  	});
});

router.get('/logout', function(req, res, next) {
  delete req.session.userId;
  res.redirect('/');
});

module.exports = router;