const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class User extends Model {
    static async finduserbyid(id){
        return User.findByPk(id);
    }
    static  async finduserbyusername(username){
        return User.findOne({
            where: {
                username,
            }
        });
    }
    static verifypass(password,passhash){
        return bcrypt.compareSync(password, passhash);
    }
    static hashpass(password){
        return bcrypt.hashSync(password, 10);
    }
}
User.init({
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  sequelize: db,
  modelName: 'user'
  // options
});

module.exports = User;