var express = require('express');
var router = express.Router();
const admin = require('../services/admin');
const register = require('../services/register');
var edit;
/* GET home page. */
router.get('/', function(req, res, next) {
  var id = admin.finduserbyid(req.session.id); 
    res.render('index',{id,edit});
});
/*GET register*/
router.get('/register',function(req,res,next){
  var id = admin.finduserbyid(req.session.id);
  res.render('register',{id});
})

/*POST success*/
router.post('/register',function(req,res,next){
   var addnames = register.addname(req.body.ten);
   var addemails = register.addemail(req.body.email);
   var addsdts = register.addsdt(req.body.sdt);
   res.send("Đăng kí thành công");
    
})
/*Admin*/
router.get('/admin',function(req,res){
  var id = admin.finduserbyid(req.session.id);
  if(id != 1 )
  {
    var display = register.user;
    res.render('admin',{id,display});
  }
 else
 {
   res.redirect('/');
 }
})
/*Profile */
router.post('/profile',function(req,res){
  edit = req.body.tieude || "Chào mừng bạn đến với trang admin";
  res.redirect('/');
})

router.get('/profile',function(req,res){
  var id = admin.finduserbyid(req.session.id);
  res.render('profile',{id});
})
/*Config */
router.get('/config',function(req,res){
  var id = admin.finduserbyid(req.session.id);
  res.render('config',{id});
})
module.exports = router;
