var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    delete req.session.id ;
    res.redirect('/');
});
module.exports=router;