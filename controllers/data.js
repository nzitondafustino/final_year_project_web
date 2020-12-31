const ObjectsToCsv = require('objects-to-csv');
const fs = require("fs");
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
exports.exportData = async function(req,res,next){
  res.render('pages/export',{title:"Export Data"});
}
exports.getExportData = async function(req,res,next){

  const initialDate = fomateDate(req.body.initial);
  const finalDate = fomateDate(req.body.final);

  const data = await Data.find({})
                          .where('created').gte(initialDate)
                          .where('created').lte(finalDate);
  const csvData = [];
  data.forEach(d =>{
    const columnData = {
    SN:d.serialNumber,
    EC:d.EC,
    temperature:d.temperature,
    VWC:d.VWC,
    created:d.created
    };
    csvData.push(columnData);
  });
  const csv = new ObjectsToCsv(csvData);
  await csv.toDisk('./data.csv');

  return res.download('./data.csv',()=>{
    fs.unlinkSync('./data.csv');
  });
}
function fomateDate(stringDate){
  var date = stringDate.split("/");
  newDate = new Date();
  newDate.setDate(date[0]);
  newDate.setMonth(parseInt(date[1]) - 1);
  newDate.setYear(date[2]);
  return newDate;
}