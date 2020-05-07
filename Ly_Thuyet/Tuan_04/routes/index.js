var express = require('express');
var router = express.Router();
const user = require('../services/user');
const todo = require('../services/todo');
var task = todo.findall();
const complete = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  const title = "BTCN04-Todo app";
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var id = user.finduserbyid(req.session.id);
  res.render('index', { id,title,date,task,complete});
});
          //TODO app
// Thêm danh sách công việc cần làm
router.post('/addtask', function(req,res){
    var addtask = req.body.newtask;
    todo.add(addtask);
    res.redirect("/");
})
//Danh sách công việc đã hoàn thành
router.post('/removetask', function(req,res){
        var completeTask = req.body.check;
        todo.markasdone(complete,completeTask,task);
        //res.json(complete);
        res.redirect("/");

})
module.exports = router;
