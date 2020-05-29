var express = require('express');
var router = express.Router();
const user = require('../services/user');
const todo = require('../services/todo');

const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler (async function(req, res, next) {
  const title = "BTCN08-Todo app-Facebook";
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var id = await user.finduserbyid(req.user);
  if(id)
  {
    //Xuất danh sách todo chưa hoàn thành
    const exportTodo = await todo.findallnotdone(req.user);
    //Xuất danh sách công việc đã hoàn thành
    const complete = await todo.findalldone(req.user);
    res.render('index', { id,title,date,exportTodo,complete});
  }
  else
  {
    res.render('index', { id,title,date});
  }
}));
          //TODO app
//Check công việc đã hoàn thành
router.get('/:id/done', asyncHandler(async function(req,res) {
      const {id} = req.params;
      const todos = await todo.findbyid(id);
      if(todos){
        await todos.markasdone();
      }
      res.redirect('/');
}))
// Thêm danh sách công việc cần làm
router.post('/addtask', asyncHandler( async function(req,res){
    var addtask = req.body.newtask;
    todo.add(addtask,req.user);
    res.redirect("/");
}));
module.exports = router;
