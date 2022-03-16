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
        // if no role modification occurs
        if (!req.body.role){
            next();
        } 
        // if the author of the modif has the right to do it
        else if (res.locals.userRole > parseInt(req.body.role,10)){
            next();
        } 
        // when the modification is unauthorized
        else {
            res.status(403).json({message: ["Vous n'êtes pas autorisé à réaliser cette action."] })
        }
    }
    catch(error){
        res.status(500).json(error)
    } 
}