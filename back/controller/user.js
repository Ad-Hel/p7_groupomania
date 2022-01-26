const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        res.status(500).json({error});
    };   
};

exports.signin = async (req, res, next) => {
    try{
        const user = await User.findOne({where: { mail: req.body.mail}});
        if (!user){
            res.status(401).json({ error: "Utilisateur inconnu."})
        };
        console.log(user.id);
        const pwd = await bcrypt.compare(req.body.password, user.password);
        if (!pwd){
            res.status(401).json({error: "Mot de passe inconnu."});
        };
        console.log("mot de passe : " + pwd)
        res.status(201).json({
            userId: user.id,
            token: jwt.sign(
                { 
                    userId: user.id,
                    userRole: user.role
                 },
                'TOKEN_TO_HIDE_IN_ENV',
                { expiresIn: '12h' }
                )
        });
    } catch(error){
        res.status(500).json(error);
    }
}

exports.showOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);
    } catch(error){
        res.status(404).json(error);
    }
}

exports.modifyOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id);
        if (req.body.password){
            console.log("test password ok");
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await user.update({
                ...req.body,
                password: hash
            });
            res.status(200).json(newUser); 
        } else {
            const newUser = await user.update({
                ...req.body
            });
            res.status(200).json(newUser);
        };
    } catch(error){
        res.status(404).json(error);
    }
}