var express = require('express');
var router = express.Router();
const user = require('../services/user');
const register = require('../services/registerhn');
const { body, validationResult } = require('express-validator');
const conference = require('../services/conference');

const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler (async function(req, res, next) {
  var id = await user.finduserbyid(req.session.id); 
  const Conference = await conference.findallconference();
    res.render('index',{id,Conference});
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
  const display_conference = await conference.findallconference();
  res.render('admin',{id,display: display,display_conference: display_conference });
}));
//Thêm thông tin hội nghị
router.get('/addreference',asyncHandler(async function(req,res){
  var id = await user.finduserbyid(req.session.id);
  res.render('addreference',{id});
}))
router.post('/addreference',[
  body('name')
  .trim()
  .notEmpty(),
  body('content')
  .trim()
  .notEmpty(),
  body('detail')
  .trim()
  .notEmpty(),
  body('time')
  .trim()
  .notEmpty(),
],asyncHandler(async function (req,res){
  const errors = validationResult(req);
  var id =  await user.finduserbyid(req.session.id);
  if (!errors.isEmpty()) {
      return res.status(422).render('addreference',{id,errors: errors.array()});
  }
  const conferences = await conference.create({
      name: req.body.name,
      content: req.body.content,
      detail: req.body.detail,
      time: req.body.time,
  });
  res.redirect('/');
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
