const db = require('./db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/*model user*/
const Model = Sequelize.Model;

class Article extends Model {
    static async findall(){
        return Article.findAll({ 
          where: {
            content: {
              [Op.like]: '%-19%',
            },
          },
          limit: 10,
          order: [['pubDate', 'DESC']]
        });
    }
    static async DeleteNoCov(){
      return Article.destroy({
        where: {
          content: {
            [Op.notLike]: '%-19%',
          },
        }
      })
    }
}
Article.init({
  // attributes
  link: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pubDate:{
    type: Sequelize.DATE,
    allowNull: false
  },
  source:{
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'article'
  // options
});

module.exports = Article;