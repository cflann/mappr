var mongoose = require('mongoose');

var pointSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number
});

var Point = mongoose.model('Point', pointSchema);

module.exports = Point;
