const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const isTargetValid = require('../middleware/isTargetValid')

const textCtrl = require('../controller/text');

router.post('/', isAuth, textCtrl.create);
router.put('/:id', isAuth, isTargetValid, textCtrl.modify);
router.delete('/:id', isAuth, isTargetValid, textCtrl.delete);
router.put('/restore/:id', isAuth, isTargetValid, textCtrl.restore);
router.delete('/destroy/:id', isAuth, isTargetValid, textCtrl.destroy);
router.get('/:id', isAuth, textCtrl.show);
router.get('/page/:page', isAuth, textCtrl.showAll);
router.get('/deleted/page/:page', isAuth, textCtrl.showDeleted);
router.get('/:id/page/:page', isAuth, textCtrl.showResponses);

module.exports = router;