var express = require('express');
var router = express.Router();
const user = require('../services/user');
const tour = require('../services/tour');
const multer = require('multer');
const fs = require("fs");
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler (async function(req, res, next) {
  const title = "GK";
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var id = await user.finduserbyid(req.session.id);
    res.render('index', { id,title,date});
}));

//add câu 1
router.post('/add', asyncHandler( async function(req,res){
    const Ma = req.body.ma;
    const Ten = req.body.ten;
    const TheLoai = req.body.theloai;
    const Congty = req.body.cty;
    await tour.addTour(Ma,Ten,TheLoai,Congty);
    res.redirect("/");
}));

//Upload file
var upload = multer({ dest: '/tmp/'});

router.post('/upload', upload.single('photo'),asyncHandler (async function(req, res) {
  var id =  await user.finduserbyid(req.session.id);
  var img_name = id.id;
  var file = './public/images' + '/' + img_name + '.png';
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      res.send(500);
    } else {
      res.redirect('/');
    }
  });
}));

module.exports = router;
