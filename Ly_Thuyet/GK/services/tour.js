const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class Tour extends Model {
    static addTour(Ma,Ten,TheLoai,CongTy){
        return Tour.create({Ma: Ma,Ten: Ten, TheLoai: TheLoai, Cty: CongTy});
    }
}
Tour.init({
  // attributes
  Ma: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  Ten: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  TheLoai: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  Cty: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'tour'
  // options
});
module.exports = Tour;