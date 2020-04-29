var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.post('/sum',function(req,res){
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  const sum = a + b;
  res.render('sum',{a,b,sum});
})
module.exports = router;
