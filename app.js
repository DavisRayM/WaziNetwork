const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const User = require('./models/user');

const engine = require('ejs-mate');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'wild goose chase aslkadksjdoa',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to DB
mongoose.connect('mongodb://localhost:27017/final-projectr', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Check db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
  console.log('Connected to the goose!');
})

// Setup Socket.io
io.on('connection', (socket) => {
  console.log('User connected');
});

// set local variables middleware
app.use(function (req, res, next) {
  // set error message
  res.locals.error = req.session.error || ' ';
  delete req.session.error;

  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/auth', usersRouter);

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

module.exports = app;
