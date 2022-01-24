const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});


module.exports = sequelize;