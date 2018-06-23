const mongoose = require('mongoose');
var Temple   =  require('./temple.model');

const ImageSchema = mongoose.Schema({
  path:String,
  temple: {type:mongoose.Schema.Types.ObjectId,ref:"Temple"}
},{
  timestamps: true
});

module.exports = mongoose.model('Image', ImageSchema);