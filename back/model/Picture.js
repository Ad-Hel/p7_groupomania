const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class Picture extends Model {};

Picture.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    paranoid: true,
    modelName: 'Picture'
});

module.exports = Picture;