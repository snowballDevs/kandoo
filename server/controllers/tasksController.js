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
                console.log(column);
                const {tasks} = column;
                return res.json(tasks);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    // createTask
    createTask: async (req, res) => {
        try {
            const {boardId, columnId} = req.params;
            // console.log(req.params);
            const {taskName, priority, taskDetail} = req.body;

            const task = {
                taskName,
                priority,
                taskDetail,
            };
            const board = await Board.findById(boardId);
            const column = board.columns.id(columnId);
            if (!column) {
                res.json('Column not found');
            }

            column.tasks.push(task);
            board.save();

            return res.json(board);
        } catch (error) {
            console.error(error);
        }
    },

    // updateTask

    updateTask: async (req, res) => {
        try {
            const {boardId, columnId, taskId} = req.params;
            const {taskName, priority, taskDetail} = req.body;
            // const board = await Board.findById(boardId)
            console.log(boardId);

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
            await board.save();

            console.log(task);
            return res.json(task);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    // deleteTask

    deleteTask: async (req, res) => {
        try {
            const {boardId, columnId, taskId} = req.params;

            const board = await Board.findById(boardId);
            const column = board.columns.id(columnId);
            column.tasks.id(taskId).deleteOne();
            await board.save();
            console.log(board);
            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
};
