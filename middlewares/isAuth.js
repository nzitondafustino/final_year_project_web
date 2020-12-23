exports.isAuth = (req,res,next)=>{
    if(!req.session.user){
           backURL=req.header('Referer') || '/';
           return res.redirect(backURL);
    }
    res.locals.user=req.session.user;
    next();
}

exports.isAdmin = (req,res,next)=>{
    if(!req.session.user){
        backURL=req.header('Referer') || '/';
        return res.redirect(backURL);
    } 
    else if(req.session.user.role !== 1){
        console.log(req)
        backURL=req.header('Referer') || '/';
        return res.redirect(backURL);  
    }
 res.locals.user=req.session.user;
 next();
}
exports.isNotAuth = (req,res,next)=>{
    if(req.session.user){
        return res.redirect('/admin/dashboard');
    }
    next()

}