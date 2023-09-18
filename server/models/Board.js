const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentDate: {type: Date, default: Date.now},

    description: {type: String, required: true},
    // this is changed from the user schema object - this is for MVP milestone, favoring flat comment structure rather than being able to reply to other comments
    createdBy: {type: String, required: true},

    likes: {type: Number, default: 0},
});

const taskSchema = new mongoose.Schema({
    taskName: {type: String, required: false},

    assignedUserIds: {type: Array, required: false},

    due_date: {type: Date, required: false},

    created_at: {type: Date, default: Date.now},

    // changed from a Number -> String to accommodate High/Medium/Low client selection
    priority: {type: String, required: false},

    // column: {columnSchema},
    tags: {type: Array, required: false},

    taskDetail: {type: String, required: false},

    comments: [commentSchema],
});

const columnSchema = new mongoose.Schema({
    title: {type: String, required: true},

    tasks: [taskSchema],
});

const BoardSchema = new mongoose.Schema({
    users: [
        {
            // pull array of users in board controller
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    boardName: {
        type: String,
        require: true,
    },

    columns: [columnSchema],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    description: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date, // Expected output: "Fri, 02 Feb 1996 03:04:05 GMT"
        default: Date.now,
    },
});

module.exports = {
    Board: mongoose.model('Board', BoardSchema),
};
