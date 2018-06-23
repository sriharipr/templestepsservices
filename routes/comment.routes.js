module.exports = (app) => {
  const comments = require('../controllers/comment.controller.js');

  app.post('/comment', comments.create);

  app.get('/comment/:templeId', comments.findCommentByTemple);

  app.put('/comment/:commentId', comments.update);
  
  app.delete('/comment/:commentId', comments.delete);

}