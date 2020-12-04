const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description Schema for Collection
 */
const CollectionSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  date: {
    type: Date,
    required: true,
  },
  firm: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  anexaNum: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  personId: {
    type: String,
    required: true,
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  },
});

CollectionSchema.index({'$**': 'text'});

CollectionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
  }
});

module.exports = mongoose.model('Collection', CollectionSchema);