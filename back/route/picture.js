const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const isTargetValid = require('../middleware/isTargetValid');
const multer = require('../middleware/multerConfig');

const pictureCtrl = require('../controller/picture');

router.post('/', isAuth, multer, pictureCtrl.create);
router.put('/:id', isAuth, isTargetValid, multer, pictureCtrl.modify);
router.delete('/:id', isAuth, isTargetValid, pictureCtrl.delete);
router.get('/:id', isAuth, pictureCtrl.showOne);
router.get('/page/:page', isAuth, pictureCtrl.showAll);
router.get('/deleted/page/:page', isAuth, pictureCtrl.showDeleted);
router.delete('/destroy/:id', isAuth, isTargetValid, pictureCtrl.destroyOne);
router.put('/restore/:id', isAuth, isTargetValid, pictureCtrl.restoreOne);

module.exports = router;