/** 
 * Mongo database connector
 */

const mongoose = require('mongoose');
const logger   = require('./logger');
const config   = require('../config');

mongoose.Promise = global.Promise;

let connectionAttempts = 0;

logger.info(`Trying to connect to database: ${config.dbUri}:${config.dbPort}`);

let connect = (callback) => {
    mongoose.connect(`mongodb://${config.dbUri}:${config.dbPort}/${config.dbName}`, {useNewUrlParser: true, useUnifiedTopology: true }).then(
        () => {
            connectionAttempts = 0;
            logger.info('Connected to database');
            if (callback)
                callback();
        },
        err => {
            if (connectionAttempts < 20) {
                connectionAttempts++;
                let reconnectAfter = 5000 + (connectionAttempts * 1000);
                setTimeout(() => {
                    logger.warn(`Connection timeout. Retrying connect to database in ${reconnectAfter / 1000} seconds.`);
                    connect(callback);
                }, reconnectAfter);
            } else {
                logger.error('Connection timeout. Application will be terminated.');
                process.exit(1);
            }
        }
        );
};

mongoose.connection.on('disconnected', () => {
    logger.error('Disconnected from database. Trying to reconnect.');
    connect();
});



// Connect to database
module.exports = {
    connect
}