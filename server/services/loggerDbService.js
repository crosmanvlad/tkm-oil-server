const mongoose = require('mongoose');
const EventLog = require('../models/eventLogs');

module.exports = {
    /**
     * Logs every event to the database. 
     * Every log entry will have its own document in the eventLogs collection
     * @param {*} ip Origin of the issue
     * @param {*} message Actual error message
     * @param {*} eventType Type of event (info, warn, error)
     */
    logEvent: (ip, message, eventType) => {

        if (mongoose.connection.readyState === 1) { // Database connected
            var eventLog = new EventLog({ logDate: new Date(), ip: ip, message: message, type: eventType });
            eventLog.save((err, res) => {
                if (err) {
                    console.error(`Error saving log to the database: ${err}`);
                }
            });
        }
    }

};