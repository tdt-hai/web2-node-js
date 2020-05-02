var express = require('express');
var router = express.Router();
const user = require('../services/user');
/*Login */
router.get('/', function(req,res,next){
    const title = 'BTCN04-Login'
    var id = user.finduserbyid(req.session.id);
    res.render('login', {id,title});
  })
router.post('/',function(req,res){
    const users = user.finduserbyusername(req.body.username);
    if(!users || !user.verifypass(req.body.password,users.password )){
        return res.render('login' );
    }
    else 
    {
        req.session.id = users.id;
        res.redirect('/');
    }
})
module.exports = router;