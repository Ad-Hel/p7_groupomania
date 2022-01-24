const Picture = require('../model/Picture.js');

exports.create = async (req, res, next) => {
    try{
        const picture = await Picture.create({
            ...req.body,
            imageUrl: 'https://pixabay.com'
        })
        res.status(201).json(picture);
    } catch(error) {
        res.status(500).json(error);
    }
}
exports.modify = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        if (picture){
            picture = {
                ...req.body
            }
            await picture.save();
        };
        res.status(200).json(picture);
    } catch (error) {
        res.status(404).json(error);
    }
}
exports.delete = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        if (picture){
            await picture.destroy();
        }
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