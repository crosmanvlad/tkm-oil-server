const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes/_router');
const router = require('express').Router();
const app = express();

app.set('port', process.env.PORT || 3088);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-xsrf-token');
  next();
});

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// Configure the routes
routes(router);
app.use(router);

// export app

module.exports = app;