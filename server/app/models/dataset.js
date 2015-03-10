var mongoose = require('mongoose');
var db = require('../config');

var pointSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number
});

var setSchema = mongoose.Schema({
  title: String,
  points: [pointSchema]
});

var DataSet = mongoose.model('DataSet', setSchema);

module.exports = DataSet;
