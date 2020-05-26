var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
/*Login */
router.get('/', asyncHandler( async function getlogin(req,res,next){
    var title = 'BTCN07-Login';
    var id =  await user.finduserbyid(req.session.id);
    res.render('login',{id,title});
  }));
router.post('/',asyncHandler(async function postlogin(req,res){
    const users =  await user.findbyemail(req.body.email);
    var id =  await user.finduserbyid(req.session.id);
    var title = 'BTCN06-Login';

    if(!users || ! user.verifypass(req.body.password,users.password )){
        return res.render('login',{id,title} );
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
module.exports = router;