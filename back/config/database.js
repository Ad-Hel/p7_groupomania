const Sequelize = require('sequelize');

/**
 * Create a new instance of Sequelize with the data base informations from the .env file.
 * @name sequelize
 * @constant
 */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});


module.exports = sequelize;