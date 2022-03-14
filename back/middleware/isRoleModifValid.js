/**
 * 
 * This function look fore a body.role entry in the express.Request and verifies if the locals.userRole in express.Response is greater than it.
 * 
 * @name isRoleModifValid
 * @function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
module.exports = (req, res, next) => {
    try{
        if (!req.body.role){
            next();
        } else if (res.locals.userRole > req.body.role){
            next();
        };
    }
    catch(error){
        res.status(403).json({message: "Vous n'êtes pas autorisé à réaliser cette action."})
    } 
}