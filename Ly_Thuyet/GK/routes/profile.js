var express = require('express');
var router = express.Router();
const user = require('../services/user');
const { body ,validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
/*Login */
router.get('/', asyncHandler( async function (req,res,next){
    var title = 'GK-Change';
    var id =  await user.finduserbyid(req.session.id);
    res.render('profile',{id,title});
  }));

router.post('/',[
    body('displayname')
    .trim()
    .notEmpty(),
    body('password')
    .isLength({min: 6}),
],asyncHandler(async function (req,res){
    const errors = validationResult(req);
    var id =  await user.finduserbyid(req.session.id);
    var title = 'GK-Change';
    if (!errors.isEmpty()) {
        return res.status(422).render('profile',{id,title,errors: errors.array()});
    }
    await user.update({
        email: id.email,
        displayname: req.body.displayname,
        password: user.hashpass(req.body.password),
    },
    {
        where: {
            email: id.email,
        }
    }
    );
    res.redirect('/');
}));

module.exports = router;