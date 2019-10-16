var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
//~line 10
var LocalStrategy = require('passport-local').Strategy;
//~line 12
var Users = require('./models/users');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiUsersRouter = require('./routes/api/users');
//~line 14
var authRouter = require('./routes/auth');

//~line 16
var apiAuthRouter = require('./routes/api/auth');
var app = express();

var config = require('./config.dev');
// console.log(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/users', apiUsersRouter);

//~line 32 before routes
app.use(require('express-session')({
  //Define the session store
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  //Set the secret
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    domain: config.cookie.domain,
    //httpOnly: true,
    //secure: true,
    maxAge: 3600000 //1 hour
  }
}));

app.use(passport.initialize());
app.use(passport.session());
//~line 55
passport.use(Users.createStrategy());
//~line 53
passport.serializeUser(function (user, done) {
  done(null, {
    id: user._id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//~line 74
app.use('/auth', authRouter);

//~line 74
app.use('/api/auth', apiAuthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Connect to MongoDB
mongoose.connect(config.mongodb, { useNewUrlParser: true });

module.exports = app;
