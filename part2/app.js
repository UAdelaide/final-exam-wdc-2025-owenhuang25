const express = require('express');
const path = require('path');
require('dotenv').config();
// 2-13, import additional middleware
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// 2-17, add dogs router
var dogsRouter = require('./routes/dogs');

const app = express();

// Middleware
// 2-13, Added middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Every request will have a session attatched to it
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogsRouter); // use dogs router

// Export the app instead of listening here
module.exports = app;