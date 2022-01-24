const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');
const Picture = require('./Picture');

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});
User.hasMany(Picture);
Picture.belongsTo(User, {foreignKey: 'userId', allowNull: false});
Picture.belongsToMany(User, { through: 'UsersLikePictures'});
User.belongsToMany(Picture, {through: 'UsersLikePictures'});
async function userSync(){
    await User.sync();
    console.log('Synchronisation du modèle utilisateur.');
}
userSync();


module.exports = User;