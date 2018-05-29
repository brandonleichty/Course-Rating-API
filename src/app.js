'use strict';

// load modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const routes = require('./routes/index');


const app = express();

// // set our port
// app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// parse the incomming request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);





// catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  console.log('ERROR HANDLER!');

  var err = new Error('File found!');
  err.status = 404;
  return next(err);
});

// global error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message || 'Something went wrong' });
});



module.exports = app;