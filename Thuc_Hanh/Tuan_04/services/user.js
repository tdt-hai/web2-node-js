const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class User extends Model {
    static async finduserbyid(id){
        return User.findByPk(id);
    }
    static  async findbyemail(email){
        return User.findOne({
            where: {
                email,
            }
        });
    }
    static  verifypass(password,passhash){
        return bcrypt.compareSync(password, passhash);
    }
    static  hashpass(password){
        return bcrypt.hashSync(password, 10);
    }
}
User.init({
  // attributes
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    phone:{
    type: Sequelize.STRING,
    },
    displayname: {
        type: Sequelize.STRING,
        unique: true,
    },
    token: {
        type: Sequelize.STRING,
      }
}, 
{
  sequelize: db,
  modelName: 'user'
});
// User.create({
//     id: 1,
//     email: 'test@gmail.com',
//     password: '$2b$10$ugxmrianl8RknocPwkC4kOLVP0c28Bo0OYe0dSlwp1pmNnoIE8WYu',
//     phone: '0969452985',
//     displayname: 'hahah',
//     token: null,
//     createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
//     updateAt: Sequelize.literal('CURRENT_TIMESTAMP'),
// })
module.exports = User;