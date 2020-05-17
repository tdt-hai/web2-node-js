var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
/* login */
router.get('/', asyncHandler (async function(req,res,next){
    var id = await user.finduserbyid(req.session.id);
    res.render('login',{id: id});
}));

router.post('/', asyncHandler (async function(req,res,next){
    var id = await user.finduserbyid(req.session.id);
    const users = await user.findbyemail(req.body.email);
    if(!users || !user.verifypass(req.body.password , users.password)){
        
        return res.render('login', {id});
        
    }
    else    
    {
        req.session.id = users.id;
        res.redirect('/');
    }
}));

router.get('/:id/:token',asyncHandler (async function(req,res){
    const {id , token} = req.params;
    const users = await user.finduserbyid(id);
    if(users && users.token === token ){
        users.token = null;
        users.save();
        req.session.id = users.id;
    }
    res.redirect('/');
}));

module.exports=router;