const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Text extends Model {};

Text.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    paranoid: true,
    modelName: 'Text'
})

module.exports = Text;