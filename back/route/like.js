const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const handleLike = require('../middleware/handleLike');
const likeCtrl = require('../controller/like');

router.post( '/text/:id', isAuth, handleLike, likeCtrl.like );
router.delete( '/text/:id', isAuth, handleLike, likeCtrl.unlike );
router.get( '/text/isLiked/:id', isAuth, handleLike, likeCtrl.isLiked );
router.get( '/text/count/:id', isAuth, handleLike, likeCtrl.likeCount );
router.post( '/picture/:id', isAuth, handleLike, likeCtrl.like );
router.delete( '/picture/:id', isAuth, handleLike, likeCtrl.unlike );
router.get( '/picture/isLiked/:id', isAuth, handleLike, likeCtrl.isLiked );
router.get( '/picture/count/:id', isAuth, handleLike, likeCtrl.likeCount );

module.exports = router;