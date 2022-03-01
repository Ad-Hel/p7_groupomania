const jwt = require('jsonwebtoken');

/**
 * 
 * This function get the token inside the express.Request header and verifies it with jsonwebtoken. Then the decoded token is used to set locals.userId and locals.userRole in the express.Response.
 * 
 * @name isAuth
 * @function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
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