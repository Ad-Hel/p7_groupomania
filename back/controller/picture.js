const Picture = require('../model/Picture.js');
const User = require('../model/User.js');
const fs = require('fs/promises');
const jwt = require('jsonwebtoken');

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
        if (req.file){
            const filename = picture.imageUrl.split('/images/')[1];
            await fs.unlink(`./images/${filename}`);
            const amendedPicture = await picture.update({
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
            res.status(200).json(amendedPicture);
        } else {
            const amendedPicture = await picture.update({
                ...req.body
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
    try{
        const pictures = await Picture.findAll();
        res.status(200).json(pictures);
    } catch(error){
        res.status(400).json(error);
    }
}
exports.showOne = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        res.status(200).json(picture);
    } catch(error){
        res.status(404).json(error);
    }
}
exports.like = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.body.UserId);
        const picture = await Picture.findByPk(req.params.id);
        const like = await picture.addUser(user);
        const numberOfLike = await picture.countUsers();
        res.status(200).json(numberOfLike);
    } catch(error){
        res.status(404).json(error);
    }
}
exports.unlike = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.body.UserId);
        const picture = await Picture.findByPk(req.params.id);
        const unlike = await picture.removeUser(user);
        const numberOfLike = await picture.countUsers();
        res.status(200).json(numberOfLike);
    } catch(error){
        res.status(404).json(error);
    }
}