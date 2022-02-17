const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const isTargetValid = require('../middleware/isTargetValid');
const isRoleModifValid = require('../middleware/isRoleModifValid');

const userCtrl = require('../controller/user');

router.post('/signup', userCtrl.signup );
router.post('/signin', userCtrl.signin );
router.get('/:id', isAuth, userCtrl.showOne);
router.put('/:id', isAuth, isTargetValid, userCtrl.modifyOne);
router.delete('/:id', isAuth, isTargetValid, userCtrl.deleteOne);
router.get('/all/:page', isAuth, userCtrl.showAll );
router.put('/restore/:id', isAuth, isTargetValid, userCtrl.restoreOne);
router.delete('/destroy/:id', isAuth, isTargetValid, userCtrl.hardDeleteOne);

module.exports = router;