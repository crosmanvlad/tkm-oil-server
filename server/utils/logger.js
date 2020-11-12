const winston = require('winston');
const MongoTransport = require('./customTransports/mongoTransport');

// Custom logger with
const logger = winston.createLogger({
    transports: [
        // console with timestamp
        new (winston.transports.Console)({ 'timestamp': function () { return '[' + new Date().toLocaleString() + ']'; }, 'colorize': true }),
        // our custom MongoDB logger transport
        new MongoTransport()
    ]
});

const env = process.env.NODE_ENV || 'development';

switch (env) {
case 'production': 
    logger.level = process.env.LOG_LEVEL || 'warn';
    break;
default:
    logger.level = 'debug';
}

// If logger level set by environment variable - overwrite old value
if (process.env.LOGGING_LEVEL) {
    logger.level = process.env.LOGGING_LEVEL;
}

module.exports = logger;
