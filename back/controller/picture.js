const fs = require('fs/promises');
const jwt = require('jsonwebtoken');
const Picture = require('../model/Picture');
const Like = require('../model/Like');
const User = require('../model/User');


exports.create = async (req, res, next) => {
    try{
        const pictureData = JSON.parse(req.body.picture);
        const picture = await Picture.create({
            ...pictureData,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        res.status(201).json(picture);
    } catch(error) {
        res.status(500).json(error);
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
        const filename = picture.imageUrl.split('/images/')[1];
        await fs.unlink(`./images/${filename}`);
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
                    attributes: ['firstName', 'lastName']
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
            offset: offset
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