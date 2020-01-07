var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('news');
});

var dbOptions = {
    host:'localhost', 
    user:'root',
    password: '1',
    database: 'iqserver'
  }

router.post('/', function(req, res, next) {
  var connection = mysql.createConnection(dbOptions);
  connection.connect();
  var sql = "INSERT INTO news ( date, title_news, text_member, text_curator) VALUES ?";
  var date = new Date();
  var values = [[date, req.body.title, req.body.message_participants, req.body.message_curatarams]];
  connection.query(sql, [values], function(err, rows, field) {
    if(err) {
      connection.end();
      console.log(err);
    } else {
        connection.end();
        res.render('news');
    } 
  });
});
module.exports = router;