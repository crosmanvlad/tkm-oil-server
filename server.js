const logger = require('./server/utils/logger');
const dbConnect = require('./server/utils/dbConnector').connect;
const app = require('./app');

// Connect to database
dbConnect(() => {

    // On connect start web server
    app.listen(app.get('port'), '0.0.0.0', () => {
        logger.info(`Microservice listening at port ${app.get('port')} in ${process.env.NODE_ENV || 'development'}`);
    });

});