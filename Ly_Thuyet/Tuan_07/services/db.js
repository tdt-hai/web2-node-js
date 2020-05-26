const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const database = 'covid';
const username = 'postgres';
const password='ttth';
const hosts = 'localhost';
const port = '5432'
//Cách connect 1
// const db = new Sequelize(database, username, password, {
//     host: hosts,
//     dialect: 'postgres'
//   });
//Cách connect 2
const connectionString = process.env.DATABASE_URL || 'postgres://'+ username+':'+password+'@' + hosts + ':' + port + '/'+ database
const db = new Sequelize(connectionString);
module.exports = db;
