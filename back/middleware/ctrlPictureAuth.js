const jwt = require('jsonwebtoken');

const idRoleCtrl = require('./idRoleCtrl');

const Picture = require('../model/Picture');
// const User = require('../model/User');

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId; 
        const userRole = decodedToken.userRole;
        const picture = await Picture.findByPk(req.params.id);
        const target = await picture.getUser();
        if (idRoleCtrl(userId, userRole, target.id, target.role)){
            next()
        } else{
            res.status(403).json({'message':'Vous n\'avez pas les droits nécessaires pour réaliser cette action.'})
        }
    } catch(error){
        res.status(500).json(error)
    }
}