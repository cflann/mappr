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
getSets(function(sets) {
  _.each(sets, function(set) {
    ids[set.title] = set._id;
    $select.append(set.title);
  });
});

$select.on('change', function(e) {
  var id = ids[this.val()];
  getSet(id, function(s) {
    set = s;
  });
});
