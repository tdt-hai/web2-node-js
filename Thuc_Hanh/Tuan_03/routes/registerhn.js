var express = require('express');
var router = express.Router();
const registerhns = require('../services/registerhn');
const user = require('../services/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

router.get('/',asyncHandler (async function(req,res,next){
  var id =  await user.finduserbyid(req.session.id);
    res.render('registerhn',{id});
  }));
  
  /*POST success*/
  router.post('/',[
    body('email')
    .isEmail()
    .normalizeEmail(),
    body('displayname')
    .trim()
    .notEmpty(),
    body('phonenumber')
    .trim()
    .notEmpty(),
],asyncHandler(async function (req,res){
    const errors = validationResult(req);
    var id =  await user.finduserbyid(req.session.id);
    if (!errors.isEmpty()) {
        return res.status(422).render('registerhn',{id,errors: errors.array()});
    }
       await registerhns.create({
        email: req.body.email,
        displayname: req.body.displayname,
        phone: req.body.phonenumber,
    });
    res.redirect('/');
}));

module.exports = router;