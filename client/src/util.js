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
  var feature = g.selectAll('circle')
        .data(collection.features)
        .enter().append('circle')
        .style('opacity', .6)
        .style('fill', 'red')
        .attr('r', 10);

  map.on('viewreset', update);
  update();

  function update() {
    feature.attr('transform', function(d) {
      return 'translate(' +
        map.latLngToLayerPoint(d.geometry.coordinates).x + ',' +
        map.latLngToLayerPoint(d.geometry.coordinates).y + ')';
    });
  }
};

var addPoint = function(point) {
  set.push(point);
  load(geoJSON(set));
  var data = {
    id: ids[currentSet],
    point: point
  };
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/point',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(data) {
      console.log('succesfully posted point!');
      listPoints();
    },
    error: function(err) {
      console.error(err);
    }
  });
};

var addSet = function(title) {
  currentSet = title;
  set = [];
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/dataset',
    contentType: 'application/json',
    data: JSON.stringify({title: title}),
    success: function(res) {
      // SHOULD GET BACK SET ID
      ids[title] = res;
      console.log('current',currentSet);
      fillSelector();
      $select.val(currentSet);
      $select.trigger('change');
    },
    error: function(err) {
      console.error(err);
    }
  })
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
    url: 'http://localhost:3000/api/dataset/' + id,
    success: function(data) {
      callback(data);
    },
    error: function(err) {
      console.error(err);
    }
  });
};
