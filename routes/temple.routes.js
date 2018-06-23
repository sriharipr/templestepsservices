module.exports = (app) => {
  const temple = require('../controllers/temple.controller');

  app.post('/temples', temple.create);

  app.get('/temples', temple.findAll);

  app.get('/temples/:templeId', temple.findOne);

  app.put('/temples/:templeId', temple.update);
  
  app.delete('/temples/:templeId', temple.delete);

}