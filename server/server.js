var handler = require('./lib/request-handler');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser());

/* Our server is going to expose a RESTful API to allow for easy access of
 user data sets.

 Data sets are stored in GeoJSON format in our Mongo database. Each set is
 represented by a 'feature collection.' Features are defined by users and
 may contain arbitrary information relative to specific data points.
 */

// TODO: still need to handle user login, signup, auth
//app.get('/', handler.renderIndex);

app.get('/api/dataset', handler.getSets);
app.get('/api/dataset/:id', handler.getSet);

app.post('/api/dataset', handler.postSet);
app.post('/api/point', handler.postPoint);

// app.get('/*', function(req, res) {
//   res.redirect('/');
// });

app.listen(3000);
console.log('Server listening on port 3000');
