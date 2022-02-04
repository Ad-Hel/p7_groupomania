const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const likeCtrl = require('../controller/like')

router.post( '/:id', auth, likeCtrl.like );
router.delete( '/:id', auth, likeCtrl.unlike );
router.get( '/isLiked/:id', auth, likeCtrl.isLiked );
router.get( '/count/:id', likeCtrl.likeCount );

module.exports = router;