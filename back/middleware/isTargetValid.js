const User = require('../model/User');
const Picture = require('../model/Picture');
const Text = require('../model/Text')

module.exports = async (req, res, next) => {
    try{
        if (req.baseUrl.includes('user')){
            const user = await User.findByPk(req.params.id, { paranoid: false });
            res.locals.targetId = user.id;
            res.locals.targetRole = user.role;
        } else if (req.baseUrl.includes('picture')){
            const picture = await Picture.findByPk(req.params.id, { include: User, paranoid: false });
            res.locals.targetId = picture.UserId;
            res.locals.targetRole = picture.User.role;
        } else if (req.baseUrl.includes('text')){
            const text = await Text.findByPk(req.params.id, {include: User, paranoid: false});
            res.locals.targetId = text.UserId;
            res.locals.targetRole = text.User.role;
        }
        else {
            res.status(500).json({ message: "Contrôle impossible. Accès refusé." })
        };
        if ( res.locals.userId == res.locals.targetId && !req.baseUrl.includes('destroy') && !req.baseUrl.includes('restore') ){
            next();
        } else if ( res.locals.userRole > res.locals.targetRole ){
            next()
        } else {
            res.status(403).json({message: "Vous n'êtes pas autorisé à réaliser cette action."})
        }
    }
    catch(error){
        res.status(500).json({message: "Une erreur lors du contrôle d'accès s'est produite."})
    }
}