const express = require('express');

const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Get Comments
// router.get('/', commentsController.getComments)

// Create Comment
router.post('/:commentId/createComment', commentsController.createComment);

// Update Comment
router.put('/:commentId/updateComment', commentsController.updateComment);

// Like Comment
router.put('/:commentId/likeComment', commentsController.likeComment);

// Delete Comment
router.delete('/:commentId/deleteComment', commentsController.deleteComment);

// // Delete Comment
// router.delete(
//   '/:boardId/tasks/:taskId/comments/:commentId/deleteComment',
//     commentsController.deleteComment
// );
module.exports = router;
