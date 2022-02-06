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
 
 /**
  * Export module with two arguments, the first is the method to save the file. 
  */
 module.exports = multer({storage: save}).single('image');