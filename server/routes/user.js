const UserHandler = require('./handlers/userHandler');

module.exports = (router) => {

  router.post('/signup', UserHandler.signup);

  router.post('/login', UserHandler.login);
  
  router.get('/user/:userId', UserHandler.allowIfLoggedin, UserHandler.getUser);
  
  router.get('/users', UserHandler.allowIfLoggedin, UserHandler.grantAccess('readAny', 'profile'), UserHandler.getUsers);
  
  router.put('/user/:userId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('updateAny', 'profile'), UserHandler.updateUser);
  
  router.delete('/user/:userId', UserHandler.allowIfLoggedin, UserHandler.grantAccess('deleteAny', 'profile'), UserHandler.deleteUser);  

}