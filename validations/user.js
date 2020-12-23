//importing express validator
const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.addUser=[
    body('first_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    body('last_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    body('email').normalizeEmail().isEmail().withMessage("Must be Real email")
    .custom(email=>{
        return User.findOne({email:email})
        .then((user)=>{
            if(user){
                return Promise.reject("E-mail already inuse")
            }
        })
    }),
    body('password')
    .trim()
    .isLength({min:4})
    .withMessage("Password must be at least 4 characters"),
    body('confirmPassword')
    .trim()
    .custom((confirmPassword,{req})=>{
        if(confirmPassword !== req.body.password)
        {
            throw new Error("Password does not match")
        }
        return true;
    })
]
exports.updateUser=[
    body('first_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    body('last_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    body('email').normalizeEmail().isEmail().withMessage("Must be Real email"),
    body('password').optional({checkFalsy:true}).isLength({min:4})
    .custom((password,{req})=>{
        if(password != req.body.confirm_password){
            throw new Error("Password does not match")
        }
        return true;
    })
]