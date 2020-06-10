const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class Conference extends Model {
    static async findallconference(){
            return Conference.findAll({ 
                order: [['time', 'DESC']]
              });
      }
}
Conference.init({
  // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    detail: {
        type: Sequelize.STRING,
    },
    time: {
        type: Sequelize.DATE,
    }
}, 
{
  sequelize: db,
  modelName: 'conference'
});

module.exports = Conference;