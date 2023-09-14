const express = require('express');
const columnsController = require('../controllers/columnsController');

const router = express.Router({mergeParams: true});

// router.route allows us to define multiple HTTP methods for the same route

// prettier-ignore
router.route('/')
    .get(columnsController.getColumns)
    .post(columnsController.createColumn);

// prettier-ignore
router.route('/:columnId')
    .put(columnsController.updateColumn)
    .delete(columnsController.deleteColumn);

module.exports = router;
