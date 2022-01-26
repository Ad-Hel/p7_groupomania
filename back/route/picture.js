const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const ctrlPictureAuth = require('../middleware/ctrlPictureAuth');
const multer = require('../middleware/multerConfig');

const pictureCtrl = require('../controller/picture');

router.post('/', auth, multer, pictureCtrl.create);
router.put('/:id', ctrlPictureAuth, multer, pictureCtrl.modify);
router.delete('/:id', ctrlPictureAuth, pictureCtrl.delete);
router.get('/:id', pictureCtrl.showOne);
router.get('/', auth, pictureCtrl.showAll);
router.post('/like/:id', auth, pictureCtrl.like);
router.delete('/like/:id', auth, pictureCtrl.unlike);

module.exports = router;