module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const validator = require('../middleware/token.validator.middleware');
  
  app.post('/user/authenticate', user.authenticate);

  app.use(validator.validate);

  app.post('/user', user.create);

  app.get('/user', user.findAll);

  app.get('/user/:userName', user.findOne);

  
  

}