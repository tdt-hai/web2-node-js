var express = require('express');
var router = express.Router();
const admin = require('../services/admin');
/* GET home page. */
router.get('/', function(req, res, next) {
  const id = admin.finduserbyid(req.session.id);
  if( id != 1)
  {
    res.render('index',{id});
  }
  else{
    res.render('admin',{id});
  }

});
/*GET register*/
router.get('/register',function(req,res,next){
  const id = admin.finduserbyid(req.session.id);
  res.render('register',{id});
})

/*POST success*/
router.post('/success',function(req,res,next){
  var ten = req.body.ten;
  var email = req.body.email;
  var sdt = req.body.sdt;
  if(ten == '' || email == '' || sdt == '' )
  {
    res.send('Đăng kí thất bại');
  }
  else
  res.render('success',{ten,email,sdt});
    
})
module.exports = router;
