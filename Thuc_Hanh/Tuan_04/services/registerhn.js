const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model userhn*/
const Model = Sequelize.Model;

class Userhn extends Model {
  static async findalluserhn(){
    return Userhn.findAll();
  }
}
Userhn.init({
  // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone:{
    type: Sequelize.STRING,
    },
    displayname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, 
{
  sequelize: db,
  modelName: 'userhn'
});

module.exports = Userhn;
