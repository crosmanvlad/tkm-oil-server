const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes/_router');
const config = require('./server/config')
const User = require('./server/models/user');
const jwt = require('jsonwebtoken');
const app = express();

app.set('port', process.env.PORT || 3088)

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-xsrf-token, x-access-token');
  next();
});

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(accessToken, config.jwtSecret);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one"
      });
      console.log(error);
      next(error);
    }
  } else {
    next();
  }
});

// Configure the routes
routes(app);

// export app
module.exports = app;