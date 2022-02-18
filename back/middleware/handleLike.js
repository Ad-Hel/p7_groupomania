module.exports = async (req, res, next) => {
    try{
        console.log(req.path)
        if (req.path.includes('picture')){
            res.locals.target = 'PictureId';
            next()
        } else if (req.path.includes('text')){
            res.locals.target = 'TextId';
            next()
        } else {
            res.status(500).json({message: "Les like ne sont possibles que sur les images et les textes."})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
}