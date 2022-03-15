const { Op, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const Picture = require('../model/Picture');
const Like = require('../model/Like');

/**
 * 
 * This function tests if a password exist, hash it and adds it to an object used to create an user ressource.
 * 
 * @function
 * @param {express.Request} req
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.signup = async (req, res, next) => {
    try {
        let hash = null;
        if (req.body.password){
            hash = await bcrypt.hash(req.body.password, 10);
        }
        const user = await User.create({
            ...req.body,
            password: hash
        });
        res.status(201).json({user});
    } catch (error){
        const messages = []
        if (error instanceof ValidationError){
            error.errors.forEach((error) => {
                let message;
                switch (error.path){
                    case 'firstName':
                        message = 'Le prénom ';
                        break;
                    case 'lastName':
                        message = 'Le nom de famille ';
                        break;
                    case 'email':
                        message = 'L\'adresse courriel ';
                        break;
                    case 'password':
                        message = 'Le mot de passe ';
                        break;
                };
                switch (error.validatorKey){
                    case 'notEmpty' :
                    case 'is_null' :
                        message += 'est obligatoire.';
                        break;
                    case 'not_unique':
                        message += 'renseignée est déjà utilisé.';
                        break;
                };
                messages.push(message);
            })
        }
        res.status(500).json(messages);
    };   
};

/**
 * 
 * This function looks for a ressource user with a matching email and password and sends back the ressource data and a authentification token.
 * 
 * @function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns 
 */
exports.signin = async (req, res, next) => {
    try{
        const user = await User.findOne({where: { email: req.body.email}});
        if (!user){
            return res.status(401).json( ["Utilisateur inconnu."] )
        };
        const pwd = await bcrypt.compare(req.body.password, user.password);
        if (!pwd){
            return res.status(401).json( ["Mot de passe erroné."] );
        };
        res.status(201).json({
            ...user.dataValues, // TO DO : remove password from this
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


/**
 * 
 * This function gets an user ressource identified by its id.
 * 
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id,{attributes: ['id', 'firstName', 'lastName', 'email', 'role']});
        res.status(200).json(user);
    } catch(error){
        res.status(404).json(error);
    }
}


/**
 * 
 * This function gets an user identified by its id and updates it. Two scenario are handled, the one where a new password is submit and needs to be hashed, and another one where the password remains untouched.
 * 
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
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

/**
 * 
 * This function gets an user ressource identified by its id, soft deletes like and picture ressources associated and finally soft deletes the user ressource.
 * 
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.deleteOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id);
        await Like.destroy({
            where: {
                UserId: req.params.id
            }
        });
        await Picture.destroy({
            where: {
                UserId: req.params.id
            }
        });
        await user.destroy();
        res.status(200).json({"message":"Utilisateur supprimé."});
    } catch(error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This functions get 9 user ressources including soft deleted ones determined by the page parameter.
 * 
 * @function
 * @param {express.Request & {paramPage: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showAll = async (req, res, next) => {
    const offset = (req.params.page - 1) * 9;
    try{
        const users = await User.findAndCountAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'deletedAt'],
            where: {
                role: {
                    [Op.lt]: res.locals.userRole
                }
            },
            limit: 9,
            offset: offset,
            paranoid: false
        })
        res.status(200).json(users);
    } catch(error){
        res.status(400).json(error);
    }
}

/**
 * 
 * This function restore a soft deleted user ressource identified by its id and the soft deleted picture and like ressources associated to it.
 * 
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.restoreOne = async (req, res, next) => {
    try{
        User.restore({
            where: {
                id: req.params.id
            }
        })
        Picture.restore({
            where: {
                UserId: req.params.id
            }
        });
        Like.restore({
            where: {
                UserId: req.params.id
            }
        });
        res.status(200).json({message: "Utilisateur restauré !"});
    } catch (error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This function get a soft deleted user ressource and permanently remove like and picture ressources associated to it and finally remove permanently the user ressource.
 * 
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.hardDeleteOne = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id, { paranoid: false });
        Like.destroy({
            where: {
                UserId: req.params.id
            },
            force: true
        });
        Picture.destroy({
            where: {
                UserId: req.params.id
            },
            force: true
        })
        user.destroy({ force: true });
        res.status(200).json({message: "Utilisateur supprimé."})
    } catch(error){
        res.status(404).json(error);
    }
}