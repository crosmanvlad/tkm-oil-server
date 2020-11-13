const collectionService  = require('../../services/collection');
const Collection   = require('../../models/collection');
const _            = require('lodash');
const logger       = require('../../utils/logger');

module.exports = {

  getAll: (req, res) => {
    const {_q, page, start, end} = req.query;
    const defaultPage = page ? parseInt(page) : 0;
    const startDate = start ? start : new Date(2020, 10, 8);
    const endDate = end ? end : new Date();
    collectionService.find(_q || '', startDate, endDate, defaultPage)
      .then(response => {
        logger.info(`200 OK. Request '${req.path}'.`);
        res.send(response);
      })
      .catch(err => {
        logger.error(`Error: ${err}. Stack: ${err.stack}`);
        return res.sendStatus(500);
      });
  },

  insert: (req, res) => {
    const {date, firm, location, anexaNum, quantity} = req.body;

    if (date && firm && location && anexaNum && quantity) {
      let collection = new Collection({date, firm, location, anexaNum, quantity, person: `${req.user.lastName} ${req.user.firstName}`});

      collection.save(err => {
        if (err) {
          logger.error(`Error: ${err}. Stack: ${err.stack}`);
          return res.sendStatus(500);
        }
        logger.info(`Timestamp: ${Date.now()}, Level: INFO, Message: Collection inserted by: ${collection.person}`);
        res.send(collection);
      });
    } else {
      logger.error(`400 Bad Request. Request '${req.path}'.`);
      res.sendStatus(400);
    }
  }

};