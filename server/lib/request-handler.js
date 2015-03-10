var DataSet = require('../app/models/dataset');

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
  DataSet.find().where('title').equals(req.data.set.title)
    .exec(function(err, set) {
      if (!set) {
        var newSet = new DataSet(req.data.set);
        newSet.save(function(err, newSet) {
          if (err) {
            // TODO - send error alert
          } else {
            res.status(201).end();
          }
        });
      } else {
        // TODO: let user know that set with title already exists
      }
    });
};

exports.postPoint = function(req, res) {
  var setID = req.body.id;
  DataSet.findById(setID)
    .exec(function(err, set) {
      set.points.push(req.data.point);
    })
    .save(function(err, set) {
      if (err) {
        // TODO: handle error
      } else {
        res.status(201).end();
      }
    });
};
