var express = require('express');
var router = express.Router();
const user = require('../services/user');
const todo = require('../services/todo');

const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler (async function(req, res, next) {
  const title = "BTCN06-Todo app";
  var today = new Date();
  //res.json(await todo.findtest(2));
  const test = await todo.findtest(2);
  console.log(test.email);
  //console.log('test la :' + await todo.findtest(1));
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var id = await user.finduserbyid(req.session.id);
  if(id)
  {
    //Xuất danh sách todo chưa hoàn thành
    const exportTodo = await todo.findallnotdone(req.session.id);
    //Xuất danh sách công việc đã hoàn thành
    const complete = await todo.findalldone(req.session.id);
    //console.log(exportTodo[1].name);
    res.render('index', { id,title,date,exportTodo,complete, test});
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
    //res.json(req.session.id);
    var addtask = req.body.newtask;
    todo.add(addtask,'hai',req.session.id);
    res.redirect("/");
}));
module.exports = router;
