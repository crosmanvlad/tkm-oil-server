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
        .sort({date: -1})
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
};