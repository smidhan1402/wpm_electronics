const mongoose = require('mongoose');
const airconditioner = mongoose.model('airconditioner');

const airconditionerCreate = function (req, res) {
  airconditioner.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
  }, (err, location) => {
    if (err) {
      res
      .status(400)
      .json(err);
    } else {
      res
      .status(201)
      .json(location);
    }
  });
};
// ---------------------------------------------------read all-------------------------------
const airconditionerReadAll = async (req, res) =>{
  try {
    const results = await airconditioner.find();
    
    const resairconditioner = results.map(result => ({
      _id: result._id,
      name: result.name,
      image:result.image,
      price:result.price,
      description:result.description,
    }));
    res.status(200).json(resairconditioner);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching airconditioner.' });
  }
  };
    
const airconditionerReadOne = function (req, res) {
  if (req.params && req.params.airconditionerid) {
    airconditioner
      .findById(req.params.airconditionerid)
      .exec((err, airconditioner) => {
        if (!airconditioner) {
          res	
            .status(404) 
            .json({	
              "message": "locationid not found"
            });	 
          return;
        } else if (err) {
          res	
            .status(404) 
            .json(err); 
          return; 	
        }
        res		
          .status(200)
          .json(airconditioner);
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "No locationid in request"
      });		
  }
};

const airconditionerUpdateOne = function (req, res) {
  if (!req.params.locationid) {
    res
      .status(404)
      .json({
        "message": "Not found, locationid is required"
      });
    return;
  }
  foods
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec((err, location) => {
      if (!location) {
        res
          .json(404)
          .status({
            "message": "foodid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      location.name = req.body.name;
      location.address = req.body.address;
      location.facilities = req.body.facilities.split(",");
      location.coords = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ];
      location.openingTimes = [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1,
      }, {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2,
      }];
      location.save((err, location) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(location);
        }
      });
    }
  );
};

const airconditionerDeleteOne = function (req, res) {
  const locationid = req.params.locationid;
  if (locationid) {
    airconditioner
      .findByIdAndRemove(locationid) 
      .exec((err, location) => {
          if (err) {
            res
              .status(404)
              .json(err);
            return;
          }
          res
            .status(204)
            .json(null);
        }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "No locationid"
      });
  }
};

module.exports = {
  airconditionerCreate,
  airconditionerReadOne,
  airconditionerUpdateOne,
  airconditionerDeleteOne,
  airconditionerReadAll
};
