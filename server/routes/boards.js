const express = require('express');

const router = express.router()
const boardsController = require('../controllers/boardsController')
const {ensureAuth} = require('../middleware/auth')

// Getting all the boards
router.get('/', boardsController.getAllBoards)

// Getting a board
router.get('/:board_id', boardsController.getSingleBoard)

// Create a board
router.post('/createBoard', ensureAuth, boardsController.createBoard)

// Delete a board
router.delete('/deleteBoard/:id', ensureAuth, boardsController.deleteBoard)


module.exports = router;