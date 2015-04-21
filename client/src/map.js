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

var currentSet = '';
var set = [];
var ids = {'Default': '54ff4e8ea2f023f03b54dff6'};
var $select = $('#setSelect');

// fill selector with options
var fillSelector = function(callback) {
  getSets(function(sets) {
    _.each(sets, function(set) {
      ids[set.title] = set._id;
      $select.append('<option value="'+set.title+'">' + set.title + '</option>');
    });
    if (callback) {
      callback();
    }
  });
};
fillSelector(function() {
  currentSet = $($select.find('option')).val()[0];
  $select.trigger('change');
});

var template = _.template('<div class="point">[<%- coords[0] %>, <%- coords[1] %>]</div>');

$select.on('change', function(e) {
  $('circle').remove();
  var title = $(this).val();
  var id = ids[title];
  currentSet = title;
  getSet(id, function(s) {
    set = [];
    var $list = $('#list');
    _.each(s.points, function(point) {
      set.push({coords: [point.latitude, point.longitude]});
    });
    listPoints();

    load(geoJSON(set));
  });
});

var listPoints = function() {
  $('.point').remove();
  var $list = $('#list');
  _.each(set, function(point) {
    $list.append(template(point));
  });
  setHoverEffects();
};

$('#new-point').find('button').on('click', function(e) {
  e.preventDefault();
  var latInput = $(this.closest('div')).find('input[name="latitude"]');
  var longInput = $(this.closest('div')).find('input[name="longitude"]');
  addPoint({
    coords: [latInput.val(),
             longInput.val()]
  });
});

$('#new-set').submit(function(e) {
  e.preventDefault();
  addSet($(this).find('input').val());
});

var setHoverEffects = function() {
  $('.point').each(function(index, point) {
    $(point).hover(function() {
      $($('circle')[index]).css('fill', '#444444');
    }, function() {
      $($('circle')[index]).css('fill', 'rgb(255,0,0)');
    });
  });
};