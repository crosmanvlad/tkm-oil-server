const { insertHandler,
  getAllHandler }     = require('./handlers/gameTypeHandler');

/**
 * Generic router
 *  
 */
module.exports = router => {

  router.post('/game-type', insertHandler);

  router.get('/game-type', getAllHandler);

};