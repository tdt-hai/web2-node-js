var express = require('express');
var router = express.Router();
const user = require('../services/user');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Email = require('../services/email');

/*Register*/
router.get('/', asyncHandler( async function (req,res,next){
    var id =  await user.finduserbyid(req.session.id);
    res.render('register',{id});
  }));

router.post('/',[
    body('email')
    .isEmail()
    .normalizeEmail()
    .custom(async function (email){
        const found = await user.findbyemail(email);
        if(found)
        {
            throw Error('User exists');
        }
        else
        return true;
        }
     ),
    body('displayname')
    .trim()
    .notEmpty(),
    body('phonenumber')
    .trim()
    .notEmpty(),
    body('password')
    .isLength({min: 6}),
],asyncHandler(async function (req,res){
    const errors = validationResult(req);
    var id =  await user.finduserbyid(req.session.id);
    if (!errors.isEmpty()) {
        return res.status(422).render('register',{id,errors: errors.array()});
    }
    const users = await user.create({
        email: req.body.email,
        displayname: req.body.displayname,
        password: user.hashpass(req.body.password),
        phone: req.body.phonenumber,
        token: crypto.randomBytes(3).toString('hex').toUpperCase(),
    });
    //send email
    await Email.SendEmail(users.email,'Mã kích hoạt tài khoản',`${process.env.BASE_URL}/${users.id}/${users.token}`);
    req.session.id = users.id;
    res.redirect('/');
}));
module.exports= router;

