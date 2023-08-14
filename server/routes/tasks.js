const express = require('express');
const router = express.Router({mergeParams: true});
const tasksController = require('../controllers/tasksController');

// router.route allows us to define multiple HTTP methods for the same route

// prettier-ignore
router.route('/')
.get(tasksController.getTasks) // todo: DELETE - testing purposes
    .post(tasksController.createTask);

// prettier-ignore
router.route('/:taskId')
    .put(tasksController.updateTask)
    .delete(tasksController.deleteTask);

module.exports = router;
