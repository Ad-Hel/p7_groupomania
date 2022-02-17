const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        res.locals.userId = decodedToken.userId;
        res.locals.userRole = decodedToken.userRole;
        next();
    } catch{
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}