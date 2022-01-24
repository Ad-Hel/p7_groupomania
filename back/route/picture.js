const express = require('express');
const router = express.Router();

const pictureCtrl = require('../controller/picture');

router.post('/', pictureCtrl.create);
router.put('/:id', pictureCtrl.modify);
router.delete('/:id', pictureCtrl.delete);
router.get('/:id', pictureCtrl.showOne);
router.get('/', pictureCtrl.showAll);
router.post('/:id/like', pictureCtrl.like);

module.exports = router;