const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); 
const User = require('../models/User.model.js');
const appConfig = require('../config/app.config');

exports.create = (req, res) => {
  if(!req.body.userName || !req.body.password){
    return res.status(400).send({
      message: "User Content cannot be empty"
    })
  }
  
  var hash = bcrypt.hashSync(req.body.password,10);
  //console.log(bcrypt.compareSync(req.body.password,hash));
  
  const user = new User({
    userName: req.body.userName,
    password: hash
  })

  user.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some Error Occured While Creating a user.'
    })
  })
};


exports.findAll = (req, res) => {
  User.find().then( users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some Error Occured While reading User List.'
    })
  })
};


exports.findOne = (req, res) => {
  //console.log(req.params.userName);
  User.find({userName: req.params.userName}).then(user => {
    if(!user) {
      return res.status(404).send({
        message: "user not found with userName " + req.params.userName
      });
    }

    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Note not found with id " + req.params.userName
      });   
    }
    return res.status(500).send({
      message: "Error retrieving note with id " + req.params.userName
    });
  })
};

exports.authenticate = (req,res) => {
  User.findOne({userName:req.body.userName}).then(user => {
    if(!user) {
      return res.status(404).send({
        message:"User Not Found"
      })
    }
    if(!bcrypt.compareSync(req.body.password,user.password)) {
      return res.status(401).send({
        message: "Un Autorized User, Provided password is wrong"
      })
    }

    const payload = {
      admin: user.isAdmin
    }

    var token = jwt.sign(payload,appConfig.secret,{
      expiresIn:60*60*24
    });
    return res.status(200).send({
      success:true,
      message:'Enjoy the Token',
      token:token,
      userName: user.userName
    })
  })
}


