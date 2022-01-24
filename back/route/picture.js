const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const pictureCtrl = require('../controller/picture');

router.post('/', auth, pictureCtrl.create);
router.put('/:id', pictureCtrl.modify);
router.delete('/:id', pictureCtrl.delete);
router.get('/:id', pictureCtrl.showOne);
router.get('/', pictureCtrl.showAll);
router.post('/like/:id', pictureCtrl.like);
router.delete('/like/:id', pictureCtrl.unlike);

module.exports = router;