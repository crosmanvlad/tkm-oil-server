const logger = require('../utils/logger');

let dbUri;
let dbName;
let dbPort;
let apiPath;

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    dbUri = process.env.MONGO_DB_URI;
    dbPort = process.env.MONGO_DB_PORT;
    dbName = process.env.MONGO_DB_NAME;
    apiPath = process.env.API_PATH;
    awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
    awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
} else {
    const config = require('./config.json');
    dbUri = config.mongodbUri;
    dbPort = config.mongodbPort;
    dbName = config.mongodbName;
    apiPath = config.apiPath;
    awsAccessKeyId = config.awsAccessKeyId;
    awsSecretAccessKey = config.awsSecretAccessKey;
}

if (!dbUri || !dbPort || !dbName) {
    console.error('Configuration for the database is not provided');
    process.exit(1);
}

if (!apiPath) {
    logger.error('API path is not defined');
    process.exit(1);
}

module.exports = {
    dbUri,
    dbPort,
    dbName,
    apiPath,
    awsAccessKeyId,
    awsSecretAccessKey
};