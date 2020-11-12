const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description Schema for Event Logs
 */
const EventLogsSchema = new Schema({
    logDate: {
        type: Date
    },
    ip: {
        type: String
    },
    message: {
        type: String
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('EventLogs', EventLogsSchema);