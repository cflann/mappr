var DataSet = require('../app/models/dataset');
var Point = require('../app/models/point');

exports.getSets = function(req, res) {
  DataSet.find().exec(function(err, sets) {
    if (sets) {
      res.status(200).send(sets);
    } else {
      res.status(404).send();
    }
  });
};

exports.getSet = function(req, res) {
  DataSet.findById(req.params.id)
    .exec(function(err, set) {
      if (set) {
        res.status(200).send(set);
      } else {
        res.status(404).send();
      }
    });
};

exports.postSet = function(req, res) {
  DataSet.findOne({title: req.body.title})
    .exec(function(err, set) {
      if (!set) {
        var newSet = new DataSet(req.body);
        newSet.save(function(err, saved) {
          if (err) {
            // TODO - send error alert
            res.status(501).send();
          } else {
            res.status(201).send(saved._id);
          }
        });
      } else {
        console.log(set);
        // TODO: let user know that set with title already exists
        res.status(405).send();
      }
    });
};

exports.postPoint = function(req, res) {
  var setID = req.body.id;
  DataSet.findById(setID)
    .exec(function(err, set) {
      if (err) {
        console.error(err);
        res.status(500).send();
      }
      if (set) {
        var newPoint = new Point({
          latitude: req.body.point.coords[0],
          longitude: req.body.point.coords[1]
        });
        set.points.push(newPoint);
        set.save(function(err, saved) {
          if (err) {
            // TODO: handle error
          } else {
            res.status(201).end();
          }
        });
      } else {
        res.status(404).send();
      }
    });
};
