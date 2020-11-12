const gameService  = require('../../services/game');
const Game         = require('../../models/game');
const _            = require('lodash');
const logger       = require('../../utils/logger');

module.exports = {

  getAllHandler: (req, res) => {
    const gameTypeId = _.get(req, 'params.gameTypeId');
    const page = _.get(req, 'params.page', 0);

    if (!gameTypeId) {
      logger.error(`400 Bad Request. Request '${req.path}'.`);
      return res.sendStatus(400);
    }

    gameService.findByGameType(gameTypeId, page)
      .then(response => {
        logger.info(`200 OK. Request '${req.path}'.`);
        res.send(response);
      })
      .catch(err => {
        logger.error(`Error: ${err}. Stack: ${err.stack}`);
        return res.sendStatus(500);
      });

  },

  insertHandler: (req, res) => {
    const gameTypeId = _.get(req, 'body.gameTypeId');
    const result = _.get(req, 'body.result');

    if (gameTypeId && (result != undefined)) {
      let game = new Game();

      game.gameTypeId = gameTypeId;
      game.result = result;
      game.timestamp = Date.now();

      game.save(err => {
        if (err) {
          logger.error(`Error: ${err}. Stack: ${err.stack}`);
          return res.sendStatus(500);
        }
        logger.info(`Timestamp: ${Date.now()}, Level: INFO, Message: Game  inserted, Game Type: ${game.gameTypeId}`);
        res.send();
      });
    } else {
      logger.error(`400 Bad Request. Request '${req.path}'.`);
      res.sendStatus(400);
    }
  }

};