const { Op, ValidationError } = require('sequelize');
const fs = require('fs/promises');
const jwt = require('jsonwebtoken');
const Picture = require('../model/Picture');
const Like = require('../model/Like');
const User = require('../model/User');

/**
 * 
 * This function create a javascript object used to create a Picture ressource.
 * 
 * @name pictureCtrl.create
 * @function
 * @param {express.Request {file: multerObject}} req 
 * @param {express.Response {localsUserId: integer}} res 
 * @param {express.NextFunction} next 
 */
exports.create = async (req, res, next) => {
    try{
        let url = null;
        if (req.file){
            url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            
        }
        const pictureData = JSON.parse(req.body.picture);
        const picture = await Picture.create({
            ...pictureData,
            UserId: res.locals.userId,
            imageUrl: url
        })
        res.status(201).json(picture);
    } catch(error) {
        const messages = []
        if (error instanceof ValidationError){
            error.errors.forEach((error) => {
                let message;
                switch (error.path){
                    case 'title':
                        message = 'Le titre ';
                        break;
                    case 'imageUrl':
                        message = 'L\'image ';
                        break;
                };
                switch (error.validatorKey){
                    case 'is_null' :
                    case 'notEmpty':
                        message += 'est obligatoire.';
                        break;
                };
                messages.push(message);
            })
        }
        res.status(500).json(messages);
    }
}

/**
 * 
 * This function create a javascript object used to update an existing picture ressource identified by its id.
 * 
 * @name pictureCtrl.modify
 * @function
 * @param {express.Request & {paramId: integer, file: multerObject}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.modify = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        const pictureData = JSON.parse(req.body.picture);
        if (req.file){
            const filename = picture.imageUrl.split('/images/')[1];
            await fs.unlink(`./images/${filename}`);
            const amendedPicture = await picture.update({
                ...pictureData,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
            res.status(200).json(amendedPicture);
        } else {
            const amendedPicture = await picture.update({
                ...pictureData
            })
            res.status(200).json(amendedPicture);
        } 
    } catch (error) {
        res.status(404).json(error);
    }
}

/**
 * 
 * This function soft delete a picture ressource identified by its Id. The actual image saved on the server is untouched.
 * 
 * @name pictureCtrl.delete
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.delete = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        await picture.destroy();
        res.status(200).json({"message" : "L'image a été supprimée"});
    } catch(error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This function get 9 picture ressources with theirs user ressources and like ressources associated. The 9 picture ressources are determined by a request parameter "page".
 * 
 * @name pictureCtrl.showAll
 * @function
 * @param {express.Request & {paramPage: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showAll = async (req, res, next) => {
    const offset = (req.params.page * 9) - 9;
    try{
        const pictures = await Picture.findAndCountAll({
            col: 'id',
            distinct:true,
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'role'],
                },
                {
                    model: Like,
                    attributes: ['UserId']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 9,
            offset: offset,
        });
        res.status(200).json(pictures);
    } catch(error){
        res.status(400).json(error);
    }
}

/**
 * 
 * This function gets 9 picture ressources who have been soft deleted with their users and likes. The 9 ressources are determined by the request parameter "page".
 * 
 * @name pictureCtrl.showDeleted
 * @function
 * @param {express.Request & {paramPage: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showDeleted = async (req, res, next) => {
    const offset = (req.params.page * 9) - 9;
    try{
        const pictures = await Picture.findAndCountAll({
            col: 'id',
            distinct:true,
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName'],
                    where: {
                        role: {
                            [Op.lt]: res.locals.userRole
                        }
                    }
                },
                {
                    model: Like,
                    attributes: ['UserId']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 9,
            offset: offset,
            where: {
                [Op.not]: {
                        deletedAt: null
                }
            },
            paranoid: false
        });
        res.status(200).json(pictures);
    } catch(error){
        res.status(400).json(error);
    }
}

/**
 * 
 * This function get one picture ressource and its user and likes identified by its id.
 * 
 * @name pictureCtrl.showOne
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.showOne = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'role']
                },
                {
                    model: Like,
                    attributes: ['UserId']
                }
            ]
        });
        res.status(200).json(picture);
    } catch(error){
        res.status(404).json(error);
    }
}

/**
 * 
 * This function get one picture ressource identified by its id to restore it.
 * 
 * @name pictureCtrl.restoreOne
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.restoreOne = async (req, res, next ) => {
    try{
        const picture = await Picture.findByPk(req.params.id, { paranoid: false });
        picture.restore()
        res.status(200).json({message: "Image restaurée"});
    } catch(error){
        res.status(404).json(error)
    }
}

/**
 * 
 * This function definitely delete a picture ressource identified by its id. The actual image saved on the server is also removed.
 * 
 * @name pictureCtrl.destroyOne
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.destroyOne = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id, { paranoid: false });
        const filename = picture.imageUrl.split('/images/')[1];
        await fs.unlink(`./images/${filename}`);
        picture.destroy({ force: true });
        res.status(200).json({message: "Image supprimée."})
    } catch(error){
        res.status(404).json(error)
    }
}