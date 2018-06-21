const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const UserSchema = mongoose.Schema({
  userName:{
    type: String,
    required:[true,'email is mandatory'],
    unique: true,
    validate: {
      validator: (v) => {
        return emailValidator.validate(v);
      },
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    min: [6, 'minimum 6 chars required'],
    required: [true, 'password is mandatory']

  },
  isAdmin:Boolean,
  randomSalt:String
},{
  timestamps: true
});


module.exports = mongoose.model('User', UserSchema);