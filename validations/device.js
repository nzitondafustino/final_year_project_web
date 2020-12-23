const { check, validationResult } = require('express-validator');

const Device = require('../models/device');

exports.addDevice = [
 check('SN').isNumeric()
 .withMessage("SN must be numeric")
 .isLength({min:5})
 .withMessage("Invalid SN")
 .custom(SN=>{
   return Device.findOne({SN:SN})
   .then(device=>{
     console.log("in validation");
     console.log(device);
       if(device){
           return Promise.reject('Device already exist')
       }
       return true;
   })
 }),
 check('location').isAlpha()
 .withMessage('location must be alphabetic'),
]
exports.updateDevice = [
  check('SN').isNumeric()
  .withMessage("SN must be numeric")
  .isLength({min:5})
  .withMessage("Invalid SN"),
  check('location').isAlpha()
  .withMessage('location must be alphabetic'),
 ]