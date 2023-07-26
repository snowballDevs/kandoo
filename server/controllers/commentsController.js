const {Board} = require('../models/Board');

module.exports = {
    // ! we are commenting out getTasks because we may be able to pass tasks down in react state to render them out.
    // getTasks: async (req, res) => {
    //   try {
    //     const { boardId } = req.params
    //     // const board = await Board.findById(boardId)
    //     console.log(boardId)
    //     const board = await Board.findById(boardId)

    //     if(board){
    //       const {tasks} = board
    //       return res.json(tasks)
    //     }

    //   } catch (error) {
    //     console.error(error)
    //     return false
    //   }
    // },

    // createTask
    createComment: async (req, res) => {
        try {
            const {boardId, taskId} = req.params;
            console.log(req.params);

            console.log(req.user);

            console.log(req.body);
            const comment = {
                description: req.body.description,
                createdBy: req.user.fullName,
            };
            const board = await Board.findById(boardId);

            if (!board) {
                res.json('Board not found');
            }

            const task = board.tasks.id(taskId);
            task.comments.push(comment);
            board.save();

            return res.json(board);
        } catch (error) {
            console.error(error);
        }
    },

    // updateTask

    updateComment: async (req, res) => {
        try {
            const {boardId, taskId, commentId} = req.params;
            const {description} = req.body;

            // const board = await Board.findById(boardId)
            console.log(boardId);

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

            const comment = board.tasks.id(taskId).comments.id(commentId);
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
            const {boardId, taskId, commentId} = req.params;
            const {likes} = req.body;

            // const board = await Board.findById(boardId)
            console.log(boardId);

            const board = await Board.findById(boardId);

            if (!board) {
                res.json('Board not found');
            }

            const comment = board.tasks
                .id(taskId)
                .comments.id(commentId)
                .$inc('likes', 1);
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
            const {boardId, taskId, commentId} = req.params;
            // const updatedBoard = await Board.findByIdAndUpdate(
            //   boardId,
            //   { $pull: { tasks: { _id: taskId } } }, // used to remove the task from the tasks array based on its _id property
            //   { new: true }
            // )
            const board = await Board.findById(boardId);
            board.tasks.id(taskId).comments.id(commentId).deleteOne();
            await board.save();
            console.log(board);
            return res.json(board);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
};
