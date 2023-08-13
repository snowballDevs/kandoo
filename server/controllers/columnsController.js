const {Board} = require('../models/Board');

module.exports = {
    getColumns: async (req, res) => {
        try {
            const {boardId} = req.params;
            // const board = await Board.findById(boardId)
            console.log(boardId);
            const board = await Board.findById(boardId);

            if (board) {
                const {columns} = board;
                return res.json(columns);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    // createColumns
    createColumn: async (req, res) => {
        try {
            const {boardId} = req.params;
            console.log(req.params);
            const {title} = req.body;

            const column = {
                title,
            };
            const board = await Board.findById(boardId);

            if (!board) {
                res.json('Board not found');
            }

            board.columns.push(column);
            board.save();

            return res.json(board);
        } catch (error) {
            console.error(error);
        }
    },

    // updateTask

    updateColumn: async (req, res) => {
        try {
            const {boardId, columnId} = req.params;
            const {title} = req.body; // took out column order
            // const board = await Board.findById(boardId)
            console.log(boardId);

            const updatedColumn = {
                // may need to use spread operator to get all of the task properties
                title,
                // columnOrder,
            };

            const board = await Board.findById(boardId);
            // const task = await board.tasks.findByIdAndUpdate(taskId, {taskName,priority}, {new: true} )
            // const updatedBoard = await Board.findByIdAndUpdate(
            //   boardId,
            //   { $set: { tasks: { _id: taskId } } }, // used to remove the task from the tasks array based on its _id property
            //   { new: true }
            // )

            if (!board) {
                res.json('Board not found');
            }

            const column = board.columns.id(columnId);
            column.set(updatedColumn);
            await board.save();

            console.log(board);
            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    // deleteColumn

    deleteColumn: async (req, res) => {
        try {
            const {boardId, columnId} = req.params;
            // const updatedBoard = await Board.findByIdAndUpdate(
            //   boardId,
            //   { $pull: { tasks: { _id: taskId } } }, // used to remove the task from the tasks array based on its _id property
            //   { new: true }
            // )
            const board = await Board.findById(boardId);
            board.columns.id(columnId).deleteOne();
            await board.save();
            console.log(board);
            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
};
