const { Op, ValidationError } = require('sequelize');
const fs = require('fs/promises');
const jwt = require('jsonwebtoken');
const Picture = require('../model/Picture');
const Like = require('../model/Like');
const User = require('../model/User');


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
        console.log(error)
        const messages = []
        if (error instanceof ValidationError){
            error.errors.forEach((error) => {
                console.log(error.path + " : " + error.validatorKey )
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
exports.delete = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        await picture.destroy();
        res.status(200).json({"message" : "L'image a été supprimée"});
    } catch(error){
        res.status(404).json(error);
    }
}
exports.showAll = async (req, res, next) => {
    const offset = (req.params.page * 9) - 9;
    try{
        const pictures = await Picture.findAndCountAll({
            col: 'id',
            distinct:true,
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName'],
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
exports.showOne = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
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

exports.restoreOne = async (req, res, next ) => {
    try{
        const picture = await Picture.findByPk(req.params.id, { paranoid: false });
        picture.restore()
        res.status(200).json({message: "Image restaurée"});
    } catch(error){
        res.status(404).json(error)
    }
}

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