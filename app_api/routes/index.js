const express = require('express');
const router = express.Router();
const refrigerator = require('../controllers/refrigerator');
const washingmachine = require('../controllers/washingmachine');
const airconditioner = require('../controllers/airconditioner');
const television = require('../controllers/television');

// --------------personals route-------------
router
  .route('/refrigerator')
  .post(refrigerator.refrigeratorCreate)
  .get(refrigerator.refrigeratorReadAll)

router
  .route('/refrigerator/:refrigeratorid')
  .get(refrigerator.refrigeratorReadOne)
  .put(refrigerator.refrigeratorUpdateOne)
  .delete(refrigerator.refrigeratorDeleteOne);
  module.exports = router;

// --------------ayurvedics route-------------
  router
  .route('/washingmachine')
  .post(washingmachine.washingmachineCreate)
  .get(washingmachine.washingmachineReadAll);

router
  .route('/washingmachine/:washingmachineid')
  .get(washingmachine.washingmachineReadOne)
  .put(washingmachine.washingmachineUpdateOne)
  .delete(washingmachine.washingmachineUpdateOne);
  
// --------------foods route-------------
  router
  .route('/airconditioner')
  .post(airconditioner.airconditionerCreate)
  .get(airconditioner.airconditionerReadAll)

router
  .route('/airconditioner/:airconditionerid')
  .get(airconditioner.airconditionerReadOne)
  .put(airconditioner.airconditionerUpdateOne)
  .delete(airconditioner.airconditionerDeleteOne);

// --------------accesories route-------------
  router
  .route('/television')
  .post(television.televisionCreate)
  .get(television.televisionReadAll)

router
  .route('/television/:televisionid')
  .get(television.televisionReadOne)
  .put(television.televisionUpdateOne)
  .delete(television.televisionDeleteOne);
