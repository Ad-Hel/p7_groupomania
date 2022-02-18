const Like = require('../model/Like');

exports.like = async (req, res, next) => {
    try{
        await Like.findOrCreate({ 
            where: {
                UserId: res.locals.userId,
                [res.locals.target]: req.params.id
            }
        })
        res.status(200).json({message: "Like enregistré"});
    } catch(error){
        res.status(404).json(error);
    }
}
exports.unlike = async (req, res, next) => {
    try{
        await Like.destroy({
            where: {
                UserId: res.locals.userId,
                [res.locals.target]: req.params.id
            },
            force: true
        })
        res.status(200).json({message: "Like supprimé"});
    } catch(error){
        res.status(404).json(error);
    }
}

exports.likeCount = async (req, res, next) =>{
    try{
        const count = await Like.count({
            where: {
                [res.locals.target]: req.params.id
            }
        })
        res.status(200).json(count);
    } catch(error){
        res.status(404).json(error);
    }
}

exports.isLiked = async (req, res, next) =>{
    try{
        const isLiked = Like.findOne({
            where: {
                UserId: res.locals.userId,
                [res.locals.target]: req.params.id
            }
        })
    } catch(error){
        res.status(404).json(error);
    }
}
