const express = require('express');

const router = express.Router()
const boardsController = require('../controllers/boardsController')
const {ensureAuth} = require('../middleware/auth')

// Getting all the boards
router.route('/')
      .get(boardsController.getAllBoards)
      .post(ensureAuth, boardsController.createBoard)

// Joining a Board with BoardId
router.route('/joinBoard')
      .post(boardsController.joinBoard)

// Delete a board
router.route('/:boardId')
      .delete(ensureAuth, boardsController.deleteBoard)

module.exports = router;