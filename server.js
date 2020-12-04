const logger = require('./server/utils/logger');
const dbConnect = require('./server/utils/dbConnector').connect;
const app = require('./app');
const https = require('https');
const fs = require('fs');
const privateKey = fs.readFileSync('./privatekey.pem');
const certificate = fs.readFileSync('./server.crt');

var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);

// Connect to database
dbConnect(() => {

    // On connect start web server
    httpsServer.listen(app.get('port'), '0.0.0.0', () => {
        logger.info(`Microservice listening at port ${app.get('port')} in ${process.env.NODE_ENV || 'development'}`);
    });

});