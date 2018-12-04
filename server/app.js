var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var FileStore = require('session-file-store')(session);
const MongoStore = require('connect-mongo')(session);

// 页面路由
var indexRouter = require('./routes/page/index');
var loginRouter = require('./routes/page/login');
var registerRouter = require('./routes/page/register');

// api路由
var users = require('./routes/api/users');
var login = require('./routes/api/login');

// 中间件路由
var auth = require('./routes/middle/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// 日志文件
var logDirectory = path.join(__dirname, '/logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/accss-%DATE%.log',
  frequency: 'daily',
  verbose: false
})
app.use(morgan('combined', { stream: accessLogStream }));

// 判断环境变量
global.resUrl = 'https://res.666.com';
if (process.env.NODE_ENV === 'development') {
  global.resUrl = '';
}

app.use(cookieParser('feifei'));
app.use(session({
  secret: 'feifei',
  name: 'lvfeifei',
  resave: false,
  store: new MongoStore({ url: 'mongodb://127.0.0.1:27017/node-book' }),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}))

app.use(auth);

// 页面路由
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// api路由
app.use('/api', login);
app.use('/api', users);

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
