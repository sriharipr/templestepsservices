var jwt = require('jsonwebtoken');
var appConfig = require('../config/app.config')

exports.validate = (req,res,next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, appConfig.secret,function(err, decoded){
      if(err){
        return res.json({
          success: false,
          message: 'failed to authenticate token'
        })
      }
      else {
        req.decoded = decoded;
        next();
      }
    })
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}