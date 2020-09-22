var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Email = require('../services/email');
/*Register*/
router.get('/', asyncHandler( async function (req,res,next){
    var title = 'BTCN06-Register';
    var id =  await user.finduserbyid(req.session.id);
    res.render('register',{id,title});
  }));

router.post('/',asyncHandler(async function (req,res){
    const users = await user.create({
        email: req.body.email,
        displayname: req.body.displayname,
        password: user.hashpass(req.body.password),
        token: crypto.randomBytes(3).toString('hex').toUpperCase(),
    });
    //send email
    await Email.SendEmail(users.email,'Mã kích hoạt tài khoản',`http://localhost:3000/login/${users.id}/${users.token}`);
    req.session.id = users.id;
    res.redirect('/');
}));
module.exports= router;