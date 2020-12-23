const mongoose=require('mongoose');

const Data = require('../models/data')

const schema=mongoose.Schema;
const deviceSchema = new schema({
    SN : String,
    location:String,
    activated:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:new Date()
    },
    updated:{
        type:Date,
        default:new Date()
    },
    data:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Data"
        }
    ]

});
const device = mongoose.model('Device',deviceSchema);
//exporting model
module.exports=device;


