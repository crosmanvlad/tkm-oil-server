const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description Schema for Event Logs
 */
const GameTypeSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  gameTypeId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  buyIn: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  minTarget: {
    type: Number
  },
  currency: {
    type: String
  }
});

module.exports = mongoose.model('GameType', GameTypeSchema);