const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const ctrlPictureAuth = require('../middleware/ctrlPictureAuth');
const multer = require('../middleware/multerConfig');

const pictureCtrl = require('../controller/picture');

router.post('/', auth, multer, pictureCtrl.create);
router.put('/:id', ctrlPictureAuth, multer, pictureCtrl.modify);
router.delete('/:id', ctrlPictureAuth, pictureCtrl.delete);
router.get('/:id', auth, pictureCtrl.showOne);
router.get('/', auth, pictureCtrl.showAll);
router.get('/page/:page', auth, pictureCtrl.showAll);
router.get('/mod/page/:page', auth, pictureCtrl.showAll);
router.delete('/destroy/:id', pictureCtrl.destroyOne);
router.put('/restore/:id', pictureCtrl.restoreOne);

module.exports = router;