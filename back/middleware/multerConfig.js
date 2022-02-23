const multer = require('multer');

const save  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.IMAGES_STORAGE_PATH);
    },
    filename: function(req, file, cb){
    const originalName = file.originalname.split('.');
    const name = originalName[0].split(' ').join('_');
    cb(null, name +  Date.now() + '.' + originalName[1]);
    }
     
 })
 
 const filter = (req, file, cb ) =>{
    const mimetypeAccepted = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/webp',

    ];
    if (!mimetypeAccepted.includes(file.mimetype)){
        cb( new Error('Type de fichier non supporté.'), false)
    }
    cb(null, true)
 }

 /**
  * Export module with two arguments, the first is the method to save the file. 
  */
 module.exports = multer({
    storage: save,
    fileFilter: filter,
    limits: {
        fileSize: 1000000
    },
    
}).single('image');