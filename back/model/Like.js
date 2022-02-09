const { Model } = require('sequelize');
const sequelize = require('../config/database.js');

class Like extends Model {};

Like.init ({
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false
    //   }
}, {sequelize, modelName: 'Like'});

module.exports = Like;