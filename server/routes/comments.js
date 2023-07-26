const express = require('express');

const router = express.Router();
const commentsController = require('../controllers/commentsController')

// Get Comments 
// router.get('/', commentsController.getComments)

// // Create Comment
// router.post('/createComment', commentsController.createComment)

// // Update Comment
// router.put('/updateComment', commentsController.updateComment)

// // Delete Comment
// router.delete('/deleteComment', commentsController.deleteComment)

module.exports = router;