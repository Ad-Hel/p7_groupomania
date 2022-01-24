const express = require('express');
const router = express.Router();

const usersCtrl = require('../controller/user');

router.post('/signup', usersCtrl.signup );

module.exports = router;