const jwt = require('jsonwebtoken');

const idRoleCtrl = require('./idRoleCtrl');

const Picture = require('../model/Picture');
// const User = require('../model/User');

module.exports = async (req, res, next) => {
    try{
        console.log("Middleware ok ")
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'TOKEN_TO_HIDE_IN_ENV');
        const userId = decodedToken.userId; 
        console.log(userId);
        const userRole = decodedToken.userRole;
        console.log(userRole);
        const picture = await Picture.findByPk(req.params.id);
        console.log(picture);
        const target = await picture.getUser();
        console.log(target);
        if (idRoleCtrl(userId, userRole, target.id, target.role)){
            next()
        } else{
            throw 'Accès refusé.' ;
        }
    } catch(error){
        res.status(500).json(error)
    }
}