const UserHandler = require('./handlers/userHandler');

module.exports = (router) => {

  router.post('/signup', UserHandler.allowIfLoggedin, UserHandler.grantAccess('createAny', 'profile'), UserHandler.signup);

  router.post('/login', UserHandler.login);
  
  router.get('/user/:userId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('readAny', 'profile'), UserHandler.getUser);

  router.get('/stats/user/:userId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('readAny', 'profile'), UserHandler.getUserStats);
  
  router.get('/users', UserHandler.allowIfLoggedin, UserHandler.grantAccess('readAny', 'profile'), UserHandler.getUsers);
  
  router.put('/user/:userId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('updateAny', 'profile'), UserHandler.updateUser);

  router.put('/user/:userId/pass', UserHandler.allowIfLoggedin, UserHandler.grantAccess('updateAny', 'profile'), UserHandler.updateUserPass);
  
  router.delete('/user/:userId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('deleteAny', 'profile'), UserHandler.deleteUser);  

}