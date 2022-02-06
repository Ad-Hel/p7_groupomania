const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = (req, res, next ) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userRole = decodedToken.userRole;
        if (req.body.role && userRole <= req.body.role){
            res.status(403).json({"message":"Vous ne pouvez pas attribuer ce rôle."});
        } else {
            next();
        }

    } catch(error){
        res.status(500).json(error);
    }
}