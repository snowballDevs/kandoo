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
            const {columnTitle} = req.body;

            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({error: 'Board not found'});
            }

            board.columns.push({title: columnTitle});
            board.save();

            const column = board.columns[board.columns.length - 1];
            console.log(column);
            return res.json(column);
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

            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({error: 'Board not found'});
            }

            const column = board.columns.id(columnId);

            if (!column) {
                return res.status(404).json({error: 'Column not found'});
            }

            column.title = title;
            await board.save();

            console.log(column);
            return res.json(column);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    // deleteColumn

    deleteColumn: async (req, res) => {
        try {
            const {boardId, columnId} = req.params;

            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({error: 'Board not found'});
            }

            const column = board.columns.id(columnId);

            if (!column) {
                return res.status(404).json({error: 'Column not found'});
            } else {
                await column.deleteOne();
            }

            await board.save();

            return res.json({message: 'Column delete successful'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: error});
        }
    },
};
