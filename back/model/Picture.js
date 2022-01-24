const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');
// const User = require('./User');

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
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Picture'
});

// Picture.belongsTo(User);
// Picture.belongsToMany(User, { through: 'UsersLikePictures'});

async function pictureSync(){
    await Picture.sync();
    console.log('Synchronisation du modèle image.');
}
pictureSync();

module.exports = Picture;