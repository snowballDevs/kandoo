const {Board} = require('../models/Board');

module.exports = {
    getTasks: async (req, res) => {
        try {
            const {boardId, columnId} = req.params;
            // const board = await Board.findById(boardId)
            // console.log('boardId: ', boardId, 'columnId: ', columnId);
            // find the specific board
            const board = await Board.findById(boardId);
            // find the specific column
            const column = board.columns.id(columnId);

            if (column) {
                const {tasks} = column;
                return res.json(tasks);
            }
        } catch (error) {
            return res.status(500).json({error});
        }
    },

    // createTask
    createTask: async (req, res) => {
        try {
            const {boardId, columnId} = req.params;
            // console.log(req.params);
            const {taskName} = req.body;
            const priority = 'low'; // default for a newly created task
            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({error: 'Board not found'});
            }

            const column = board.columns.id(columnId);

            if (!column) {
                return res.status(404).json({error: 'Column not found'});
            }

            column.tasks.push({taskName, priority});

            board.save();

            const task = column.tasks[column.tasks.length - 1];

            return res.json(task);
        } catch (error) {
            return res.status(500).json({error});
        }
    },

    // updateTask

    updateTask: async (req, res) => {
        try {
            const {boardId, columnId, taskId} = req.params;
            const {taskName, priority, taskDetail, assignedUserIds} = req.body;

            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({error: 'Board not found'});
            }

            const column = board.columns.id(columnId);

            if (!column) {
                return res.status(404).json({error: 'Column not found'});
            }

            const task = column.tasks.id(taskId);

            if (!task) {
                return res.status(404).json({error: 'Task not found'});
            }

            // Update Task properties
            task.taskName = taskName;
            task.priority = priority;
            task.taskDetail = taskDetail;
            task.assignedUserIds = assignedUserIds;
            await board.save();

            return res.json(task);
        } catch (error) {
            return res.status(500).json({error});
        }
    },
    // deleteTask

    deleteTask: async (req, res) => {
        try {
            const {boardId, columnId, taskId} = req.params;

            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({error: 'Board not found'});
            }

            const column = board.columns.id(columnId);

            if (!column) {
                return res.status(404).json({error: 'Column not found'});
            }

            const task = column.tasks.id(taskId);

            if (!task) {
                return res.status(404).json({error: 'Task not found'});
            }

            column.tasks.id(taskId).deleteOne();

            await board.save();

            return res.json(board);
        } catch (error) {
            return res.status(500).json({error});
        }
    },
};
