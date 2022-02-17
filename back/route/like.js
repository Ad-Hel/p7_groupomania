const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const likeCtrl = require('../controller/like')

router.post( '/:id', isAuth, likeCtrl.like );
router.delete( '/:id', isAuth, likeCtrl.unlike );
router.get( '/isLiked/:id', isAuth, likeCtrl.isLiked );
router.get( '/count/:id', isAuth, likeCtrl.likeCount );

module.exports = router;