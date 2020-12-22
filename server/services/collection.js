const Collection = require('../models/collection');
const logger = require('../utils/logger');

module.exports = {
  find: (query, start, end, page) => {
    return new Promise((resolve, reject) => {
      Collection.find({
        $or: [{
          location: {'$regex': query, '$options': 'i'}
        }, {
          firm: {'$regex': query, '$options': 'i'}
        }, {
          person: {'$regex': query, '$options': 'i'}
        }],
        "date": {"$gte": start, "$lt": end}
      })
        .sort({date: -1, createdDate: -1})
        .skip(50 * page)
        .limit(50)
        .exec((err, result) => {
          if (err) {
            logger.error(`Error: ${err}. Stack: ${err.stack}`);
            reject(err);
          }
          resolve(result);
        })
    })
  },

  export: (query, start, end) => {
    return new Promise((resolve, reject) => {
      Collection.find({
        $or: [{
          location: {'$regex': query, '$options': 'i'}
        }, {
          firm: {'$regex': query, '$options': 'i'}
        }, {
          person: {'$regex': query, '$options': 'i'}
        }],
        "date": {"$gte": start, "$lt": end}
      })
        .sort({date: -1, createdDate: -1})
        .exec((err, result) => {
          if (err) {
            logger.error(`Error: ${err}. Stack: ${err.stack}`);
            reject(err);
          }
          resolve(result);
        })
    })
  },

  getStats: (userId, start, end) => {
    return new Promise((resolve, reject) => {
      Collection.find({
        personId: userId,
        "date": {"$gte": start, "$lte": end}
      }).exec((err, result) => {
        if (err) {
          reject(err);
        }
        console.log(result);
        let sum = result.reduce((prev, curr) => prev + parseInt(curr.quantity), 0)
        resolve(sum);
      })
    })
  }
};