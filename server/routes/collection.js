const CollectionHandler  = require('./handlers/collectionHandler');
const UserHandler = require('./handlers/userHandler');

/**
 * Generic router
 *  
 */
module.exports = router => {

  router.post('/collection', UserHandler.allowIfLoggedin, UserHandler.grantAccess('createOwn', 'collection'), CollectionHandler.insert);

  router.get('/collections', UserHandler.allowIfLoggedin, UserHandler.grantAccess('readAny', 'collection'), CollectionHandler.getAll);

  router.put('/collection/:collectionId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('updateAny', 'collection'), CollectionHandler.update);

  router.delete('/collection/:collectionId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('deleteAny', 'collection'), CollectionHandler.delete);

};