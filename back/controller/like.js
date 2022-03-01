const Like = require('../model/Like');


/**
 * 
 * This function create a like by an user on an item if it doesn't exist yet.
 * 
 * @name likeCtrl.create
 * @function
 * @param {express.Request & {paramId : integer}}  req 
 * @param {express.Response & {localsUserId: integer, localsTarget: string}} res 
 * @param {express.NextFunction} next 
 */
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

/**
 * 
 * This function remove definitively a like ressource identified by its user and its target. 
 * 
 * @name likeCtrl.unlike
 * @function
 * @param {express.Request & {paramId : integer}} req 
 * @param {express.Response & {locals.UserId: integer, localsTarget: string}} res 
 * @param {express.NextFunction} next 
 */
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

/**
 * 
 * This function count the number of likes for a ressource identified by its id.
 * 
 * @name likeCtrl.likeCount
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response & {localsTarget: string}} res 
 * @param {express.NextFunction} next 
 */
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

/**
 * 
 * This function look for a like from one specific user to one specific ressource and return true if find it.
 * 
 * @todo Is this function used somewhere ?
 * @name likeCtrl.isLiked
 * @function
 * @param {express.Request & {paramId: integer}} req 
 * @param {express.Response & {localsUserId: integer, localsTarget: string} } res 
 * @param {express.NextFunction} next 
 */
exports.isLiked = async (req, res, next) =>{
    try{
        const isLiked = Like.findOne({
            where: {
                UserId: res.locals.userId,
                [res.locals.target]: req.params.id
            }
        })
        res.status(200).json(true);
    } catch(error){
        res.status(404).json(error);
    }
}
