const { insertHandler,
  getAllHandler }     = require('./handlers/gameHandler');

/**
 * Generic router
 *  
 */
module.exports = router => {

  router.post('/game', insertHandler);

  router.get('/game/:gameTypeId/:page', getAllHandler);

};