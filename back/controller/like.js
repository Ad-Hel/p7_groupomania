const User = require('../model/User')
const Picture = require('../model/Picture.js');

exports.like = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        const like = await picture.addUser(res.locals.userId);
        res.status(200).json(like);
    } catch(error){
        res.status(404).json(error);
    }
}
exports.unlike = async (req, res, next) => {
    try{
        const picture = await Picture.findByPk(req.params.id);
        const unlike = await picture.removeUser(res.locals.userId);
        res.status(200).json(unlike);
    } catch(error){
        res.status(404).json(error);
    }
}

exports.likeCount = async (req, res, next) =>{
    try{
        const picture = await Picture.findByPk(req.params.id);
        const likesCount = await picture.countUsers();
        res.status(200).json(likesCount);
    } catch(error){
        res.status(404).json(error);
    }
}

exports.isLiked = async (req, res, next) =>{
    try{
        const picture = await Picture.findByPk(req.params.id);
        const isLiked = await picture.hasUser(res.locals.userId);
        console.log(isLiked)
        res.status(200).json(isLiked);
    } catch(error){
        res.status(404).json(error);
    }
}