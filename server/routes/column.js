const express = require('express');
const router = express.Router({mergeParams: true});
const columnsController = require('../controllers/columnsController');

// router.route allows us to define multiple HTTP methods for the same route

// prettier-ignore
router.route('/')
    .post(columnsController.createColumn);

// prettier-ignore
router.route('/:columnId')
    .put(columnsController.updateColumn)
    .delete(columnsController.deleteColumn);

module.exports = router;
