const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');
const Picture = require('./Picture');
const Like = require('./Like');

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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    paranoid: true,
    modelName: 'User'
});




User.hasMany(Picture, {
    foreignKey: {
        allowNull: false
    }
});
Picture.belongsTo(User);
Picture.belongsToMany(User, { through: 'Like'});
User.belongsToMany(Picture, { through: 'Like' });
Picture.hasMany(Like);
User.hasMany(Like);
Like.belongsTo(Picture);
Like.belongsTo(User);




module.exports = Like;
module.exports = User;