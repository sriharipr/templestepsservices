const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  path:String
},{
  timestamps: true
});

module.exports = mongoose.model('Image', ImagesSchema);