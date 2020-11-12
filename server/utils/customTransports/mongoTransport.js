const Transport = require('winston-transport');
const logEvent = require('../../services/loggerDbService').logEvent;

// Inherit from `winston-transport` so we can take advantage of 
// the base functionality and `.exceptions.handle()`
module.exports = class MongoTransport extends Transport {
    constructor() {
        super();
    }

    log(eventType, message) {
        setImmediate(() => {
            this.emit('logged', eventType);
        });

        // Log to the database
        // TODO: Change first arg for the real one once we start receiving requests
        logEvent('192.168.0.1', message, eventType);
    }
};
