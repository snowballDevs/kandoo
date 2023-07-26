const express = require('express');

const router = express.Router();
const boardsController = require('../controllers/boardsController');
const {ensureAuth} = require('../middleware/auth');

// const taskRoutes = require('./tasks')
// const commentRoutes = require('./comments')

// Getting all the boards


// prettier-ignore
router.route('/')
    .get(boardsController.getAllBoards)
    .post(ensureAuth, boardsController.createBoard);


// prettier-ignore
router.route('/:boardId')
    .delete(ensureAuth, boardsController.deleteBoard);


module.exports = router;
