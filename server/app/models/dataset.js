var mongoose = require('mongoose');
var db = require('../config');
var Point = require('./point');

// var pointSchema = mongoose.Schema({
//   latitude: Number,
//   longitude: Number
// });

var setSchema = mongoose.Schema({
  title: String,
  points: [Point.schema]
});

var DataSet = mongoose.model('DataSet', setSchema);
new DataSet({
  title: 'Test',
  points: []
}).save(function(err, set) {
  if (err) {
    console.log('ERROR:', 'could not save to database (it may already be there)');
  } else {
    console.log('SUCCESS!', 'Saved test set to DB');
  }
});
new DataSet({
  title: 'Test2',
  points: []
}).save(function(err, set) {
  if (err) {
    console.log('ERROR:', 'could not save to database (it may already be there)');
  } else {
    console.log('SUCCESS!', 'Saved test set to DB');
  }
});

module.exports = DataSet;
