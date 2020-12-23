const express=require('express');
const router = express.Router();

//import middleware

const auth = require('../middlewares/isAuth');

router.get('/',auth.isNotAuth,function(req,res,next){
    console.log(req.csrfToken() )
res.render('pages/landing',{title:"Login"});
})
module.exports = router;