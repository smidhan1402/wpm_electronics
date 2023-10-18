const mongoose = require('mongoose');
const refrigerator = mongoose.model('refrigerator');

const refrigeratorCreate = function (req, res) {
  refrigerator.create({
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
  }, (err, refrigerator) => {
    if (err) {
      res
      .status(400)
      .json(err);
    } else {
      res
      .status(201)
      .json(refrigerator);
    }
  });
};
// ---------------------------------------------------read all-------------------------------
const refrigeratorReadAll = async (req, res) =>{
  try {
    const results = await refrigerator.find();
    console.log("from api controllers",results);
    const resrefrigerator = results.map(result => ({
      _id: result._id,
      name: result.name,
      image:result.image,
      price:result.price
      
    }));
    
    res.status(200).json(res.refrigerator);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching refrigerator.' });
  }
  };
  
const refrigeratorReadOne = function (req, res) {
  if (req.params && req.params.refrigeratorid) {
    refrigerator
      .findById(req.params.refrigeratorid)
      .exec((err, refrigerator) => {
        if (!refrigerator) {
          res	
            .status(404) 
            .json({	
              "message": "refrigeratorid not found"
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
          .json(refrigerator);
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "No refrigeratorid in request"
      });		
  }
};

const refrigeratorUpdateOne = function (req, res) {
  if (!req.params.refrigeratorid) {
    res
      .status(404)
      .json({
        "message": "Not found, refrigeratorid is required"
      });
    return;
  }
  refrigerator
    .findById(req.params.refrigeratorid)
    .select('-reviews -rating')
    .exec((err, refrigerator) => {
      if (!refrigerator) {
        res
          .json(404)
          .status({
            "message": "refrigeratorid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      refrigerator.name = req.body.name;
      refrigerator.address = req.body.address;
      refrigerator.facilities = req.body.facilities.split(",");
      refrigerator.coords = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ];
      refrigerator.openingTimes = [{
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
      refrigerator.save((err, refrigerator) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(refrigerator);
        }
      });
    }
  );
};

const refrigeratorDeleteOne = function (req, res) {
  const refrigeratorid = req.params.refrigeratorid;
  if (refrigeratorid) {
    refrigerator
      .findByIdAndRemove(refrigeratorid) 
      .exec((err, refrigerator) => {
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
        "message": "No refrigeratorid"
      });
  }
};

module.exports = {
  refrigeratorCreate,
  refrigeratorReadOne,
  refrigeratorUpdateOne,
  refrigeratorDeleteOne,
  refrigeratorReadAll
};
