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

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.send('error', {
//     message: err.message,
//     error: {}
//   });
// });



// catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Document not found');
  err.status = 404;
  return next(err);
});

// global error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message || 'Something went wrong' });
});

// start listening on our port
// var server = app.listen(app.get('port'), function() {
//   console.log('Express server is listening on port ' + server.address().port);
// });

module.exports = app;