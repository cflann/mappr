(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('./util.js');

// position map at startup
var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4});
// set map tiles
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; ' + '<a href="http://openstreetmap.org">OpenStreetMap</a>' + ' Contributors',
  maxZoom: 18
}).addTo(map);

// set up svg layer
map._initPathRoot();
var svg = d3.select('#map').select('svg');
var g = svg.append('g');

var set = [];
var ids = {};
var $select = $('#setSelect');

// fill selector with options
util.getSets(function(sets) {
  _.each(sets, function(set) {
    ids[set.title] = set._id;
    $select.append(set.title);
  });
});

$select.on('change', function(e) {
  var id = ids[this.val()];
  util.getSet(id, function(s) {
    set = s;
  });
});

},{"./util.js":2}],2:[function(require,module,exports){
exports.geoJSON = function(collection) {
  return {
    'type': 'FeatureCollection',
    'features': collection.map(function(point) {
      return {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': point.coords
        },
        'properties': point.properties
      };
    })
  };
};

exports.load = function(collection) {
  console.log('loading collection...');
  var feature = g.selectAll('circle')
        .data(collection.features)
        .enter().append('circle')
        .style('opacity', .6)
        .style('fill', 'red')
        .attr('r', 10);

  map.on('viewreset', update);
  update();
  console.log(map.getPanes().overlayPane);

  function update() {
    feature.attr('transform', function(d) {
      console.log('coords:', d.geometry.coordinates);
      return 'translate(' +
        map.latLngToLayerPoint(d.geometry.coordinates).x + ',' +
        map.latLngToLayerPoint(d.geometry.coordinates).y + ')';
    });
  }
};

exports.addPoint = function(point) {
  set.push(point);
  load(geoJSON(set));
};

exports.getSets = function(callback) {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/dataset',
    success: function(data) {
      callback(data);
    },
    error: function(err) {
      console.error(err);
    }
  });
};

exports.getSet = function(id, callback) {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/dataset:' + id,
    success: function(data) {
      callback(data);
    },
    error: function(err) {
      console.error(err);
    }
  });
};

},{}]},{},[1]);
