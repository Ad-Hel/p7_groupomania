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
                { userId: user.id },
                'TOKEN_TO_HIDE_IN_ENV',
                { expiresIn: '12h' }
                )
        });
    } catch(error){
        res.status(500).json(error);
    }
}