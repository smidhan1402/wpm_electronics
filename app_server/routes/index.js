var express = require('express');
var router = express.Router();
var ctrlElectronics = require("../controllers/Electronics");
var ctrlOthers = require("../controllers/others")
/* GET home page. */
router.get('/',ctrlElectronics.homelist);
router.get('/refrigerator',ctrlElectronics.refrigerator);
router.get('/washingmachine',ctrlElectronics.washingmachine);
router.get('/airconditioner',ctrlElectronics.airconditioner);
router.get('/television',ctrlElectronics.television);
router.get('/about',ctrlOthers.about);
router.get('/order',ctrlOthers.order);

router.get('/success',ctrlOthers.success);
module.exports = router;
