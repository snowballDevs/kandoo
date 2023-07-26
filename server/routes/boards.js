const express = require('express');

const router = express.Router()
const boardsController = require('../controllers/boardsController')
const tasksController = require('../controllers/tasksController')
const {ensureAuth} = require('../middleware/auth')
// const taskRoutes = require('./tasks')
// const commentRoutes = require('./comments')

// Getting all the boards
router.get('/', boardsController.getAllBoards)

// Create a board
router.post('/createBoard', ensureAuth, boardsController.createBoard)

// We will not need to get "single board" because we are a SPA - will leverage axios.

// Delete a board
router.delete('/deleteBoard/:id', ensureAuth, boardsController.deleteBoard)

// Delete Task
router.delete('/:boardId/tasks/:taskId/deleteTask', tasksController.deleteTask)

// Update Task
router.put('/:boardId/tasks/:taskId/updateTask', tasksController.updateTask)

// Create Task
router.post('/:boardId/tasks/createTask', tasksController.createTask)
// router.get('/:boardId/tasks/', tasksController.getTasks)
// router.use('/:boardId/tasks/', taskRoutes)
// router.use('/:boardId/tasks/:taskId/comments', commentRoutes)

module.exports = router;