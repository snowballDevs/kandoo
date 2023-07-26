const express = require('express');
const router = express.Router({mergeParams: true}); // needed so that the router can access parameters defined in parent router

const commentsController = require('../controllers/commentsController');

// prettier-ignore
router.route('/')
    .post(commentsController.createComment);

// prettier-ignore
router.route('/:commentId')
    .put(commentsController.updateComment)
    .patch(commentsController.likeComment)
    .delete(commentsController.deleteComment);

module.exports = router;
