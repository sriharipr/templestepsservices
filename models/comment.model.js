const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: String,
  createdBy: String
},{
  timestamps:true
});

module.exports = mongoose.model('Comment',CommentSchema);