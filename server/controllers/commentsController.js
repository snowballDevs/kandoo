const {Task, Comment} = require('../models/Board');

module.exports = {
    createComment: async (req, res) => {
        try {
            const { comment_detail } = req.body;
            const { taskId } = req.params;
            console.log(req.params);

            const comment = await Comment.create({
                comment_detail,
                created_by: req.user._id,
                task_id: taskId,
            });

            const task = await Task.findByIdAndUpdate(
                taskId,
                { $push: { comments: comment._id } },
                { upsert: true, new: true }
              );
            console.log(comment);
            return res.json(comment);
        } catch (error) {
            console.error(error);
        }
    },

    // updateTask

    updateComment: async (req, res) => {
        try {
            const {commentId} = req.params;
            const {comment_detail} = req.body;

            // const board = await Board.findById(boardId)
            console.log(commentId);
            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                {comment_detail},
                {new: true}
            );
            console.log(updatedComment);
            return res.json(Task);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    // deleteTask

    deleteComment: async (req, res) => {
        try {
            const { taskId, commentId } = req.params;

            await Comment.findByIdAndDelete(commentId);

            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                {$pull: {comments: {_id: commentId}}}, // used to remove the task from the tasks array based on its _id property
                {new: true}
            );
            console.log(updatedTask);
            return res.json(updatedTask);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
};
