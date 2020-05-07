var express = require('express');
var router = express.Router();
const admin = require('../services/admin');
/* login */
router.get('/',function(req,res){
    var id = admin.finduserbyid(req.session.id);
    res.render('login',{id});
})

router.post('/',function(req,res){
    const admins = admin.finduserbyusername(req.body.email);
    if(!admins || !admin.verifypass(req.body.password,admins.password )){
        return res.render('login' );
    }
    else 
    {
        req.session.id = admins.id;
        res.redirect('/');
    }
})
module.exports=router;