const Game = require('../models/game');
const logger = require('../utils/logger');

module.exports = {
  findByGameType: (gameTypeId, page) => {
    const match={'$match' : {
      'gameTypeId' : gameTypeId
    }
    };

    const proj1={'$project' : {
      '_id' : 0,
      'result' : 1,
      'gameTypeId': 1,
      'timestamp' : 1,
      'h' : {
        '$hour' : '$timestamp'
      },
      'm' : {
        '$minute' : '$timestamp'
      },
      's' : {
        '$second' : '$timestamp'
      },
      'ml' : {
        '$millisecond' : '$timestamp'
      }
    }
    };

    const proj2={'$project' : {
      '_id' : 0,
      'result' : 1,
      'gameTypeId': 1,
      'timestamp': '$timestamp',
      'day' : {
        '$subtract' : [
          '$timestamp',
          {
            '$add' : [
              '$ml',
              {
                '$multiply' : [
                  '$s',
                  1000
                ]
              },
              {
                '$multiply' : [
                  '$m',
                  60,
                  1000
                ]
              },
              {
                '$multiply' : [
                  '$h',
                  60,
                  60,
                  1000
                ]
              }
            ]
          }
        ]
      }
    }
    };

    const sort1 = {'$sort': {
      'timestamp': 1
    }
    };

    const group={'$group' : {
      '_id' : '$day',
      'games': {
        '$push': {
          'result' : '$result',
          'timestamp': '$timestamp'
        }
      },
      'count' : {
        '$sum' : 1
      },
      'win' : {
        '$sum': '$result'
      }
    }
    };
    const group2 ={'$group' : {
      '_id': gameTypeId,
      'days': {
        '$push': '$$ROOT'
      },
      'totalDays': {
        '$sum': 1
      },
      'totalGames' : {
        '$sum' : '$count'
      },
      'totalWin' : {
        '$sum': '$win'
      }
    }
    };

    const sort = {'$sort': {
      '_id': -1
    }
    };

    const limit = {'$limit': 3};
    const skip  = {'$skip': page * 3};

    return new Promise((resolve, reject) => {
      Game.aggregate([match, proj1, proj2, sort1, group, sort, skip, limit, group2]).exec((err, result) => {
        if (err) {
          logger.error(`Error: ${err}. Stack: ${err.stack}`);
          reject(err);
        }
        resolve(result[0] ? result[0] : {});
      });
    });
  }
};