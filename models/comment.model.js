const mongoose = require('mongoose');
var Temple   =  require('./temple.model');

const CommentSchema = mongoose.Schema({
  content: {type:String, required: ['true', 'Empty comments can not be posted.']},
  createdBy: String,
  temple: {type:mongoose.Schema.Types.ObjectId,ref:"Temple"}
},{
  timestamps:true
});

module.exports = mongoose.model('Comment',CommentSchema);