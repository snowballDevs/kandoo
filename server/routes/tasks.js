const express = require('express');

const router = express.Router();
const tasksController = require('../controllers/tasksController')

// Get Tasks 
router.get('/', tasksController.getTasks)

// Create Task
router.post('/createTask', tasksController.createTask)

// Update Task
router.put('/updateTask', tasksController.updateTask)

// Delete Task
router.delete('/deleteTask', tasksController.deleteTask)

module.exports = router;