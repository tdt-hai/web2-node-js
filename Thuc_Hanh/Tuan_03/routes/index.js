var express = require('express');
var router = express.Router();
const user = require('../services/user');
const register = require('../services/registerhn');

const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler (async function(req, res, next) {
  var id = await user.finduserbyid(req.session.id); 
    res.render('index',{id});
}));

router.get('/user', asyncHandler (async function(req,res){
  var id = await user.finduserbyid(req.session.id);
  if(id == 1 )
  {
    res.render('user',{id});
  }
 else
 {
    res.redirect('/');
 }
}));
//Admin
router.get('/admin', asyncHandler (async function(req,res){
  var id = await user.finduserbyid(req.session.id);
  const display = await register.findalluserhn();
  //res.json(display);
  res.render('admin',{id,display: display});
}));

/*Profile */
router.get('/profile', asyncHandler (async function(req,res){
  var id = await user.finduserbyid(req.session.id);
  res.render('profile',{id});
}));

/*Config */
router.get('/config',asyncHandler (async function(req,res){
  var id =  await user.finduserbyid(req.session.id);
  res.render('config',{id});
}));
module.exports = router;
