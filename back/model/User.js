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

User.hasMany(Text, {
    foreignKey: {
        allowNull: false
    }
});
Text.belongsTo(User);

Picture.hasMany(Like);
User.hasMany(Like);
Text.hasMany(Like);

Like.belongsTo(Picture);
Like.belongsTo(User);
Like.belongsTo(Text);

Text.hasMany(Text, {
    foreignKey: {
        name: 'parent'
    }
});
Text.belongsTo(Text);





module.exports = Like;
module.exports = User;