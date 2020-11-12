const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description Schema for Event Logs
 */
const GameSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  gameTypeId: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Game', GameSchema);