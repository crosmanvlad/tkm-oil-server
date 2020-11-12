const GameType     = require('../../models/gameType');
const _            = require('lodash');
const logger       = require('../../utils/logger');
const randomstring = require('randomstring');

module.exports = {

  /**
   * @description Function to handle requests
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  getAllHandler: (req, res) => {
    GameType.find({}, (err, response) => {
      if (err) {
        logger.error(`Error: ${err}. Stack: ${err.stack}`);
        return res.sendStatus(500);
      }
      logger.info(`200 OK. Request '${req.path}'.`);
      res.send(response);
    });
  },

  insertHandler: (req, res) => {
    const buyIn = _.get(req, 'body.buyIn');
    const tax = _.get(req, 'body.tax');
    const currency = _.get(req, 'body.currency', 'USD');

    if (buyIn && tax) {
      let gameType = new GameType();

      gameType.gameTypeId = randomstring.generate(16);
      gameType.name = `${currency}${buyIn} (${currency}${buyIn - tax} + ${currency}${tax})`;
      gameType.buyIn = buyIn;
      gameType.tax = tax;
      gameType.minTarget = buyIn / (2 * (buyIn - tax));
      gameType.currency = currency;

      gameType.save(err => {
        if (err) {
          logger.error(`Error: ${err}. Stack: ${err.stack}`);
          return res.sendStatus(500);
        }
        logger.info(`Timestamp: ${Date.now()}, Level: INFO, Message: Game Type created, Game Type: ${gameType.name}`);
        res.send();
      });
    } else {
      logger.error(`400 Bad Request. Request '${req.path}'.`);
      res.sendStatus(400);
    }
  }

};