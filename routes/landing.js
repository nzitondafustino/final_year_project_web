const express=require('express');
const router = express.Router();

//import middleware

const auth = require('../middlewares/isAuth');

router.get('/',auth.isNotAuth,function(req,res,next){
const error = req.query.error;
    console.log(error);
   res.render('pages/landing',{title:"Login",error:error});
})
module.exports = router;