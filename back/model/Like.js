const { Model } = require('sequelize');
const sequelize = require('../config/database.js');

class Like extends Model {};

Like.init ({
}, {
    sequelize,
    paranoid: true, 
    modelName: 'Like'
});

module.exports = Like;