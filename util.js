var geoJSON = function(collection) {
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

var load = function(collection) {
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

var addPoint = function(point) {
  set.push(point);
  load(geoJSON(set));
};

var getSets = function(callback) {
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

var getSet = function(id, callback) {
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
