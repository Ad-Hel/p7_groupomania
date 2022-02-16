const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const authCtrl = require('../middleware/ctrlUserAuth');
const ctrlUserRole = require('../middleware/ctrlUserRole');

const userCtrl = require('../controller/user');

router.post('/signup', userCtrl.signup );
router.post('/signin', userCtrl.signin );
router.get('/:id', auth, userCtrl.showOne);
router.put('/:id', authCtrl, ctrlUserRole, userCtrl.modifyOne);
router.delete('/:id', authCtrl, ctrlUserRole, userCtrl.deleteOne);
router.get('/all/:page', userCtrl.showAll );
router.put('/restore/:id', userCtrl.restoreOne);
router.delete('/destroy/:id', userCtrl.hardDeleteOne);

module.exports = router;