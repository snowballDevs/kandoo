const {Board} = require('../models/Board');

module.exports = {
    // * this is for testing purposes only
    // todo Delete getComments before Production
    getComments: async (req, res) => {
        try {
            const {boardId, columnId, taskId} = req.params;
            // const board = await Board.findById(boardId)

            const board = await Board.findById(boardId);
            const column = board.columns.id(columnId);
            const task = column.tasks.id(taskId);

            if (task) {
                const {comments} = task;
                return res.json(comments);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    // createTask
    createComment: async (req, res) => {
        try {
            const {boardId, columnId, taskId} = req.params;

            const comment = {
                description: req.body.description,
                createdBy: req.user.fullName,
            };
            const board = await Board.findById(boardId);

            if (!board) {
                res.json('Board not found');
            }
            const column = board.columns.id(columnId);
            if (!column) {
                res.json('Column not found');
            }

            const task = column.tasks.id(taskId);
            task.comments.push(comment);
            board.save();

            const addedComment = task.comments[task.comments.length - 1];

            const serverResponse = {
                board,
                task,
                addedComment
            }

            return res.json(serverResponse);
        } catch (error) {
            console.error(error);
        }
    },

    // updateTask

    updateComment: async (req, res) => {
        try {
            const {boardId, columnId, taskId, commentId} = req.params;
            const {description} = req.body;

            const updatedComment = {
                description,
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
            if (!column) {
                res.json('Column not found');
            }

            const comment = column.tasks.id(taskId).comments.id(commentId);
            comment.set(updatedComment);
            await board.save();

            console.log(board);
            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },

    // likeComment
    likeComment: async (req, res) => {
        try {
            const {boardId, columnId, taskId, commentId} = req.params;

            // const board = await Board.findById(boardId)
            console.log(boardId);

            const board = await Board.findById(boardId);

            if (!board) {
                res.json('Board not found');
            }

            const column = board.columns.id(columnId);
            if (!column) {
                res.json('Column not found');
            }

            const task = column.tasks.id(taskId);
            if (!task) {
                return res.json('Task not found');
            }

            const comment = task.comments.id(commentId);
            if (!comment) {
                return res.json('Comment not found');
            }
            comment.$inc('likes', 1);
            // column.tasks.id(taskId).comments.id(commentId).$inc('likes', 1);

            // comment.likes+=1
            await board.save();

            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },

    // deleteTask

    deleteComment: async (req, res) => {
        try {
            const {boardId, columnId, taskId, commentId} = req.params;
            // const updatedBoard = await Board.findByIdAndUpdate(
            //   boardId,
            //   { $pull: { tasks: { _id: taskId } } }, // used to remove the task from the tasks array based on its _id property
            //   { new: true }
            // )
            const board = await Board.findById(boardId);
            const column = board.columns.id(columnId);
            column.tasks.id(taskId).comments.id(commentId).deleteOne();
            await board.save();
            console.log(board);
            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
};
