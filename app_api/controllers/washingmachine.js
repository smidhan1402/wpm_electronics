const mongoose = require('mongoose');
const washingmachine = mongoose.model('washingmachine');

const washingmachineCreate = function (req, res) {
  washingmachine.create({
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
  }, (err, washingmachine) => {
    if (err) {
      res
      .status(400)
      .json(err);
    } else {
      res
      .status(201)
      .json(washingmachine);
    }
  });
};
// ---------------------------------------------------read all-------------------------------
const washingmachineReadAll = async (req, res) =>{
  try {
    const results = await washingmachine.find();
    const reswashingmachine = results.map(result => ({
      _id: result._id,
      name: result.name,
      image:result.image,
      price:result.price,
    }));
    console.log(reswashingmachine);
    res.status(200).json(reswashingmachine);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching movies.' });
  }
  };

const washingmachineReadOne = function (req, res) {
  if (req.params && req.params.washingmachineid) {
    washingmachine
      .findById(req.params.washingmachineid)
      .exec((err, washingmachine) => {
        if (!washingmachine) {
          res	
            .status(404) 
            .json({	
              "message": "washingmachineid not found"
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
          .json(washingmachine);
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "No washingmachineid in request"
      });		
  }
};

const washingmachineUpdateOne = function (req, res) {
  if (!req.params.washingmachineid) {
    res
      .status(404)
      .json({
        "message": "Not found, washingmachineid is required"
      });
    return;
  }
  washingmachine
    .findById(req.params.washingmachineid)
    .select('-reviews -rating')
    .exec((err, washingmachine) => {
      if (!washingmachine) {
        res
          .json(404)
          .status({
            "message": "washingmachineid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      washingmachine.name = req.body.name;
      washingmachine.address = req.body.address;
      washingmachine.facilities = req.body.facilities.split(",");
      washingmachine.coords = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ];
      washingmachine.openingTimes = [{
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
      washingmachine.save((err, washingmachine) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(washingmachine);
        }
      });
    }
  );
};

const washingmachineDeleteOne = function (req, res) {
  const washingmachineid = req.params.washingmachineid;
  if (washingmachineid) {
    washingmachine
      .findByIdAndRemove(washingmachineid) 
      .exec((err, washingmachine) => {
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
        "message": "No washingmachineid"
      });
  }
};

module.exports = {
  washingmachineCreate,
  washingmachineReadOne,
  washingmachineUpdateOne,
  washingmachineDeleteOne,
  washingmachineReadAll
};
