const multer = require('multer');

/**
 * @name multer.save
 * @constant
 */
const save  = multer.diskStorage({
    /**
     * 
     * This function provides a callback to set the path to the directory where the images will be saved.
     * 
     * @name multer.save.destination
     * @function
     * @param {express.Request} req 
     * @param {multer.File} file 
     * @param {function} cb 
     */
    destination: function(req, file, cb) {
        cb(null, process.env.IMAGES_STORAGE_PATH);
    },
    /**
     * 
     * This function provides a callback to set the file name.
     * 
     * @param {express.Request} req 
     * @param {multer.File} file 
     * @param {function} cb 
     */
    filename: function(req, file, cb){
    const originalName = file.originalname.split('.');
    const name = originalName[0].split(' ').join('_');
    cb(null, name +  Date.now() + '.' + originalName[1]);
    }
     
 })
 
 /**
  * 
  * This function check if the file MIME type is an accepted one.
  * 
  * @name multer.filter
  * @function
  * @param {express.Request} req 
  * @param {multer.file} file 
  * @param {function} cb 
  */
 const filter = (req, file, cb ) =>{
     /**
      * 
      * This constant is an array of the MIME type accepted.
      * 
      * @name multer.filter.mimetypeAccepted
      * @constant
      */
    const mimetypeAccepted = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/webp'
    ];
    if (!mimetypeAccepted.includes(file.mimetype)){
        cb( new Error('Type de fichier non supporté.'), false)
    };
    cb(null, true)
 }

module.exports = multer({
    storage: save,
    fileFilter: filter,
    limits: {
        fileSize: 1000000
    }
}).single('image');