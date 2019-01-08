var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var pug = require('pug');
var firebase = require('firebase');
var session = require('express-session');

var login = require('./routes/login');
var news = require('./routes/news');
var favs = require('./routes/favs');
var profile = require('./routes/profile');

var usersRouter = require('./routes/users');
var app = express();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b59085633ba541a685595843a02c1bb8');

var config = {
  apiKey: "AIzaSyBiTEsu89T-zfaOSsOiyOZjgE-7hOvzFDA",
    authDomain: "news-examination.firebaseapp.com",
    databaseURL: "https://news-examination.firebaseio.com",
    projectId: "news-examination",
    storageBucket: "news-examination.appspot.com",
    messagingSenderId: "211079417360"
};
firebase.initializeApp(config);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var sessionTime = 3600000 
app.use(session({
  cookie: { maxAge: sessionTime },
  resave: true,
  saveUninitialized: false,
  secret: 'examination'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', login);
app.use('/news', news);
app.use('/users', usersRouter);
app.use('/favs', favs);
app.use('/profile', profile);

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
var port = process.env.PORT || 8080;
app.listen(port, function() {
});