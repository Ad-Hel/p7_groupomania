const express = require('express');
const router = express.Router();

const authCtrl = require('../middleware/ctrlUserAuth');
const ctrlUserRole = require('../middleware/ctrlUserRole');

const userCtrl = require('../controller/user');

router.post('/signup', userCtrl.signup );
router.post('/signin', userCtrl.signin );
router.get('/:id', authCtrl, userCtrl.showOne);
router.put('/:id', authCtrl, ctrlUserRole, userCtrl.modifyOne);

module.exports = router;