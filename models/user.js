//importing mongooose package
const mongoose = require('mongoose');
//creating mongoose Schema

const schema = mongoose.Schema;

const userSchema = new schema({
    first_name : String,
    last_name : String,
    email : {
        type: String,
        match:[ /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]
    },
    role: Number,
    password: String
    });
const user = mongoose.model("User",userSchema);

module.exports=user;