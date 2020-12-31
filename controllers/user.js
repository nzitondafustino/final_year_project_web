//hashing package
const bcrypt = require('bcrypt');
//importing user Model
const User = require('../models/user');

//import validation errors
const { validationResult } = require('express-validator');

exports.getAddUser = function(req,res,next){

    res.render('pages/add-user',{title:"New User"});
}
exports.allUser = async function(req,res,next){
    const users = await User.find();
    if(req.session.user){
    }
    res.render('pages/all-users',{title:"All Users",users:users});
}
exports.postAddUser = async function(req,res,next){
    //validating incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/add-user',{title:"New User",errors:errors});
      }
    //populating user with incomimg requwest user
    try {
       const hash = await bcrypt.hash(req.body.password,10);
        const user = new User({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email :req.body.email,
            role:req.body.role,
            password:hash
        })
        //saving user int a database
        await user.save();
    } catch(e){
        //console.log(e.message);
    }
    //redirecting to all user after saving
    res.redirect('/admin/all-users');
}
exports.updateUser = async function(req,res,next){
 var id = req.params.id;
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     console.log(errors);
     const users = await User.find();
     return res.render('pages/all-users',{title:"All Users",users:users,errors:errors});
   }
    const user = await User.findById(id);
    if(user.email !== req.body.email){
        const user1 = await User.findOne({email:req.body.email});
        if(user1){
            errors.errors.push({
                value:req.body.email,
                msg:"User E-mail already exit"
            })
            console.log(errors);
            const users = await User.find();
            return res.render('pages/all-users',{title:"All Users",users:users});
        }

    }
    await User.findByIdAndUpdate(id,req.body,{new:true});
 res.redirect('/admin/all-users');
}
exports.deleteUser = async function(req,res,next){
    var id = req.params.id; 
    await User.findByIdAndDelete(id);
    res.redirect('/admin/all-users');
}
exports.userLogin = async function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email:email});
    if(!user){
        return res.redirect('/?error=Invalid email or password');
    }
    const result = await bcrypt.compare(password,user.password);

    if(!result){
        return res.redirect('/?error=Invalid email or password');
    }
    req.session.user = {
        first_name : user.first_name,
        last_name : user.last_name,
        email :user.email,
        role:user.role
    }
    res.redirect('/admin/dashboard');
}
exports.userLogout = (req,res,next)=>{
    req.session.destroy((error)=>{
        res.redirect('/');
    })
}
