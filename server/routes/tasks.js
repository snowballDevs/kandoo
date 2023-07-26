const express = require('express');

const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Get Tasks
// router.get('/', tasksController.getTasks)

// Create Task
router.post('/:taskId/createTask', tasksController.createTask);

// Update Task
router.put('/:taskId/updateTask', tasksController.updateTask);

// Delete Task
router.delete('/:taskId/deleteTask', tasksController.deleteTask);

module.exports = router;
