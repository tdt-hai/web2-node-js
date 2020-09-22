var express = require('express');
var router = express.Router();
const user = require('../services/user');
const Article = require('../services/article');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');
const ejs = require('ejs');

/* GET home page. */
router.get('/', asyncHandler (async function(req, res, next) {
  const title = "BTCN07-covid";
  const display = await Article.findall();
  const DeleteNoCov = await Article.DeleteNoCov();
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear() ;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var id = await user.finduserbyid(req.session.id);
  res.render('index', { id,title,display,DeleteNoCov,date,time});
}));

//Người dùng lấy thông tin mới nhất
// router.post('/',asyncHandler (async function(req,res,next){
//   const id = await user.finduserbyid(req.session.id);
//   const display = await Article.findall();
//   const data = await ejs.renderFile(__dirname + '/index.ejs',{display});
//   //await Email.SendEmail(id.email,'Thông tin mới nhất covid 19 ngày hôm nay',null,data);
//   res.redirect('/');
// }))
module.exports = router;
