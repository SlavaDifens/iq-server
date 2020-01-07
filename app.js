var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var dbSessionOptions = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '1',
	database: 'sessions'
}

var sessionOptions = {
	secret: 'asdfghjkl1234567890',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}

var sessionStore = new MySQLStore(dbSessionOptions);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var personalRouter = require('./routes/personal');
var paymentRouter = require('./routes/payment');
var projectsRouter = require('./routes/projects');
var activeProjectsRouter = require('./routes/activeProjects');
var newsRouter = require('./routes/news');
var participantsRouter = require('./routes/participants');
var calendarRouter = require('./routes/calendar');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/personal', express.static(path.join(__dirname, 'public')));


app.use(session(sessionOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/personal', personalRouter);
app.use('/payment', paymentRouter);
app.use('/projects', projectsRouter);
app.use('/activeProjects', activeProjectsRouter);
app.use('/news', newsRouter);
app.use('/participants', participantsRouter);
app.use('/calendar', calendarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
