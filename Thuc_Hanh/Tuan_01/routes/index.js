var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/*GET register*/
router.get('/register',function(req,res,next){
  res.render('register');
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
