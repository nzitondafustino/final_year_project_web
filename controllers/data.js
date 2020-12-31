//importing device model
const Data = require('../models/data')
const Device = require('../models/device');

exports.updateMcData = async function(req,res,next){

  const values = req.query.data.split('*')
  const serialNumber = values[0]
  const VWC = values[1];
  const temperature = values[2];
  const EC = values[3];
  //verifying serial number of the lamp
  const device = await Device.findOne({SN:serialNumber});
  if(!device){
    return res.status(401).json({msg:"unAuthorized access"});
  }
  const data = new Data({
    serialNumber:serialNumber,
    temperature:temperature,
    VWC:VWC,
    EC:EC,
    device:device._id
  });

  await data.save()
   if(device.activated == false){
    device.activated = true
   }
   
  device.data.push(data._id)
  await device.save()

  res.io.emit("data",data)
  return res.status(200).json(data);
}