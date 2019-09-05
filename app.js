require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');

const ATLAS_USER = process.env.CLOUD_ATLAS_USERNAME;
const ATLAS_PASS = process.env.CLOUD_ATLAS_PASSWORD;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const bidsRouter = require('./routes/bids');
const chatsRouter = require('./routes/chats');

const User = require('./models/user');

const engine = require('ejs-mate');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.port || 80;

server.listen(port);

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
app.use(methodOverride('_method'));

// Configure sessions
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

mongoose.connect(
  `mongodb+srv://${ATLAS_USER}:${ATLAS_PASS}@wazinetwork-ahbjj.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

// Check db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
  console.log('Connected to the goose!');
  // Development Code: auto-generate data
  // Uncomment to generate 80 tasks by default
  // Check ./seeds.js to modify
  // const seedPost = require('./seeds');
  // seedPost();
})

// Setup Socket.io
io.on('connection', (socket) => {
  console.log('User connected');
});

// set local variables middleware
app.use(function (req, res, next) {
  // set default title variable
  res.locals.title = 'Wazi Network';
  res.locals.nav = 'none';

  // set error message
  res.locals.error = req.session.error || ' ';
  delete req.session.error;

  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/tasks/:id/bids', bidsRouter);
app.use('/chats', chatsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const { errorHandler } = require('./middleware/');

// error handler
app.use(errorHandler);

module.exports = app;
