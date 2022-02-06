const jwt = require('jsonwebtoken');
const User = require('../model/User');
const idRoleCtrl = require('./idRoleCtrl');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId; 
        const userRole = decodedToken.userRole;
        const target = await User.findByPk(req.params.id);
        if (idRoleCtrl(userId, userRole, req.params.id, target.role)){
            next()
        } else {
            res.status(403).json({"message":"Accès refusé."})
        }
    } catch(error){
        res.status(500).json(error);
    }
}

