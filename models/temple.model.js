var mongoose = require('mongoose');
var imageSchema   =  require('./images.model');

const TempleSchema = mongoose.Schema({
  title:{
    type: String,
    required:[true, 'Title missing'],
  },
  state: String,
  district: String,
  town: {
    type: String,
    required: [true, 'Town is a required to save in DB.']
  },
  zipCode: Number,
  nearestRailwayStation: String,
  nearestBusStation: String,
  nearestDomesticAirport: String,
  nearestInternationalAirport: String,
  latitude: String,
  longiTude: String,
  images: [imageSchema],
  comments: [ObjectId]
},{
  timestamps:true
});

module.exports = mongoose.Model('Temple', TempleSchema);


