/** 
 * Main application router
*/
const express = require('express');
const config = require('../config');

// Setup routes
const router = express.Router();
require('./gameType')(router);
require('./healthCheckRouter')(router);
require('./game')(router);

module.exports = app => {
    
  app.use(config.apiPath, router);
    
};