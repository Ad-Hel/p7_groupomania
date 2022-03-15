const { Op, ValidationError } = require('sequelize');
const Text = require('../model/Text');
const Like = require('../model/Like');
const User = require('../model/User');

/**
 * 
 * This function create a new text ressource.
 * 
 * @name textCtrl.create
 * @function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.create = async (req, res, next) => {
    try{
        const text = await Text.create({
            ...req.body,
            UserId: res.locals.userId
        });
        res.status(201).json(text);
    }
    catch(error){
        const messages = []
        if (error instanceof ValidationError){
            error.errors.forEach((error) => {
                let message;
                switch (error.path){
                    case 'content':
                        message = 'Le message ';
                        break;
                };
                switch (error.validatorKey){
                    case 'is_null' :
                    case 'notEmpty':
                        message += 'est vide 😢';
                        break;
                    case 'len' : 
                        message += 'est trop long ! 😮'
                        break;
                };
                messages.push(message);
            })
        }
        res.status(500).json(messages);
    }
};

/**
 * 
 * This function gets a text ressource identified by its id and updates it with request data.
 * 
 * @name textCtrl.modify
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.modify = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id);
        const amendedText = await text.update(req.body);
        res.status(200).json(amendedText);
    }
    catch(error){
        res.status(404).json(error);
    }
};

/**
 * 
 * This function gets a text ressource by its id and soft deletes it.
 * 
 * @name textCtrl.delete
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.delete = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id);
        const amendedText = await text.destroy();
        res.status(200).json({message: "Le texte a été supprimé."});
    } 
    catch(error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This function gets a soft deleted text ressource identified by its id and restores it. 
 * 
 * @name textCtrl.restore
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.restore = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id, { paranoid: false });
        text.restore();
        res.status(200).json({message: "Texte restauré"})
    }
    catch(error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This function gets a text ressource, deletes permanently all its responses and deletes permanently it.
 * 
 * @name textCtrl.destroy
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.destroy = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id, { paranoid: false });
        Text.destroy({
            where: {
                ParentId: req.params.id
            },
            force: true
        })
        text.destroy({ force: true });
        res.status(200).json({message: "Texte supprimé."})
    }
    catch(error){
        res.status(404).json(error);
    }
}


/**
 * 
 * This function get a text ressource, its author, its likes and its responses.
 * 
 * @name textCtrl.show
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.show = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id, {
            include : [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'role']
                },
                {
                    model: Like,
                    attributes: ['UserId'],
                    include: User
                },
                Text
            ]
        });
        res.status(200).json(text);
    }
    catch(error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This function get nine text ressources, their author, responses and likes. 
 * The text ressources are determined by the page number.
 * 
 * @name textCtrl.showAll
 * @function 
 * @param {express.Request & {paramPage: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showAll = async (req, res, next) => {
    const offset = (req.params.page - 1 ) * 9;
    try{
        const texts = await Text.findAndCountAll({
            include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName', 'role']
                    },
                    Text,
                    Like
                ],
            where: {
                ParentId: null
            },
            offset: offset,
            limit: 9,
            order: [
                ['createdAt', 'DESC']
            ],
            distinct:true
        });
        res.status(200).json(texts);
    }
    catch(error){
        res.status(500).json(error);
    }
}

/**
 * 
 * This function gets 9 soft deleted text ressources and their authors and likes.
 * The texts are determined by a page number.
 * 
 * @name textCtrl.showDeleted
 * @function
 * @param {express.Request & {paramPage: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showDeleted = async (req, res, next) => {
    const offset = (req.params.page - 1 ) * 9;
    try{
        const texts = await Text.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'role'],
                    where: {
                        role: {
                            [Op.lt]: res.locals.userRole
                        }
                    }
                },
                Like
            ],
            where: {
                [Op.not]: {
                    deletedAt: null
                }
            },
            offset: offset,
            limit: 9,
            order: [
                ['createdAt', 'DESC']
            ],
            paranoid: false
        });
        res.status(200).json(texts);
    }
    catch(error){
        res.status(500).json(error);
    }
}

/**
 * 
 * This function get 9 answers to a text ressources and their authors and likes.
 * The answers are determined by the page number.
 * 
 * @name textCtrl.showResponses
 * @function
 * @param {express.Request & {paramPage: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showResponses = async (req, res, next) => {
    const offset = (req.params.page - 1 ) * 9;
    try{
        const responses = await Text.findAndCountAll({
           include : [
               {
                   model: User,
                   attributes: ['id', 'firstName', 'lastName', 'role']
               },
               {
                   model: Like,
                   attributes: ['UserId']
               }
           ],
           where: {
               ParentId: req.params.id
           },
           offset: offset,
           limit: 9,
           order: [
            ['createdAt', 'ASC']
            ]
        })
        res.status(200).json(responses);
    } catch(error){
        res.status(500).json(error);
    }
}