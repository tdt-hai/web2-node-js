const todos = [];

function findall(){
    return todos;
}

function findbyid(id){
    return todos.find(t => t.id === id);
}

function markasdone(complete,completeTask,task){
    if ( typeof(completeTask) === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
      } else if ( typeof (completeTask) === "object") 
      {
        for (var i = 0; i < completeTask.length; i++) 
          {     complete.push(completeTask[i]);
                task.splice(task.indexOf(completeTask[i]), 1);
          }
      }
}

function add(name){
    todos.push(name);
    return todos;
}
module.exports = {
 findall,
 findbyid,
 markasdone,
 add,
 todos
};