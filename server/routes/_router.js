/** 
 * Main application router
*/
const express = require('express');
const config = require('../config');

// Setup routes
const router = express.Router();
require('./healthCheckRouter')(router);
require('./user')(router);
require('./collection')(router);

module.exports = app => {
    
  app.use(config.apiPath, router);
    
};