module.exports = (req, res, next) => {
    try{
        if (req.body.role && res.locals.userRole > req.body.role ){
            next();
        }
    }
    catch(error){
        res.status(403).json({message: "Vous n'êtes pas autorisé à réaliser cette action."})
    } 
}