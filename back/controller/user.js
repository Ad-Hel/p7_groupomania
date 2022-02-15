const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const queryInterface = sequelize.getQueryInterface();

const User = require('../model/User');

exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password: hash
        });
        res.status(201).json({user});
    } catch (error){
        res.status(500).json(error);
    };   
};

exports.signin = async (req, res, next) => {
    try{
        const user = await User.findOne({where: { email: req.body.email}});
        if (!user){
            return res.status(401).json({ message: "Utilisateur inconnu."})
        };
        const pwd = await bcrypt.compare(req.body.password, user.password);
        if (!pwd){
            return res.status(401).json({message: "Mot de passe erroné."});
        };
        res.status(201).json({
            ...user.dataValues,
            token: jwt.sign(
                { 
                    userId: user.id,
                    userRole: user.role
                 },
                process.env.TOKEN,
                { expiresIn: '12h' }
                )
        });
    } catch(error){
        res.status(500).json(error);
    }
}

exports.showOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id,{attributes: ['id', 'firstName', 'lastName', 'email', 'role']});
        res.status(200).json(user);
    } catch(error){
        res.status(404).json(error);
    }
}

exports.modifyOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id,{attributes: ['id', 'firstName', 'lastName', 'email', 'role']});
        if (req.body.password){
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await user.update({
                ...req.body,
                password: hash
            },{attributes: ['id', 'firstName', 'lastName', 'email', 'role']});
            res.status(200).json({...newUser.dataValues}); 
        } else {
            const newUser = await user.update({
                ...req.body
            },{attributes: ['id', 'firstName', 'lastName', 'email', 'role']});
            res.status(200).json({...newUser.dataValues});
        };
    } catch(error){
        res.status(404).json(error);
    }
}

exports.deleteOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id);
        queryInterface.bulkUpdate('pictures', {
            userId: 1000
        }, 
        {
            userId: req.params.id
        }
        )
        await user.destroy();
        res.status(200).json({"message":"Utilisateur supprimé."});
    } catch(error){
        res.status(404).json(error);
    }
}

exports.showAll = async (req, res, next) => {
    const offset = (req.params.page - 1) * 9;
    try{
        const users = await User.findAndCountAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
            limit: 9,
            offset: offset
        })
        res.status(200).json(users);
    } catch(error){
        res.status(400).json(error);
    }
}