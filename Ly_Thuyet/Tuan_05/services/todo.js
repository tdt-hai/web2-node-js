const db = require('./db');
const Sequelize = require('sequelize');

/*model  todo*/
const Model = Sequelize.Model;

class Todo extends Model {   
    static async findallnotdone(){
        return Todo.findAll({
            where: {
                done: false,
            }
        });
    }
    static async findbyid(id){
        return Todo.findByPk(id);
    }
    static async findalldone(){
        return Todo.findAll({
            where: {
                done: true,
            }
        });
    }
    async markasdone(){
        this.done = true;
        return this.save();
    }
    static add(name){
        return Todo.create({name,done: false});
    }
}
Todo.init({
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
    // allowNull defaults to true
  }
}, {
  sequelize: db,
  modelName: 'todo'
  // options
});

module.exports = Todo;
