const db = require('./db');
const Sequelize = require('sequelize');
const user = require('../services/user');

/*model  todo*/
const Model = Sequelize.Model;

class Todo extends Model {   
    static async findallnotdone(userId){
        return Todo.findAll({
            where: {
                done: false,
                userId,
            }
        });
    }
    static async findbyid(id){
        return Todo.findByPk(id);
    }
    static async findalldone(userId){
        return Todo.findAll({
            where: {
                done: true,
                userId,
            }
        });
    }
    async markasdone(){
        this.done = true;
        return this.save();
    }
    static add(name,userId){
        return Todo.create({name,done: false,userId: userId});
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
user.hasMany(Todo);
Todo.belongsTo(user);
module.exports = Todo;
