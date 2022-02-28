const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');
const Picture = require('./Picture');
const Like = require('./Like');
const Text = require('./Text');

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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

User.hasMany(Text, {
    foreignKey: {
        allowNull: false
    }
});
Text.belongsTo(User);

Text.hasMany(Text, {
    foreignKey: 'ParentId'
});

Picture.hasMany(Like);
User.hasMany(Like);
Text.hasMany(Like);

Like.belongsTo(Picture);
Like.belongsTo(User);
Like.belongsTo(Text);







module.exports = Like;
module.exports = User;