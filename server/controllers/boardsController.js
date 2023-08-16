/* eslint-disable no-console */
const {Board} = require('../models/Board');

module.exports = {
    // used on the dashboard to get all the boards
    getAllBoards: async (req, res) => {
        try {
            const userId = req.user.id;
            console.log(userId);
            const boards = await Board.find({users: userId});

            return res.json({boards});
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    // used on the boardForm to create a new board on Dashboard
    createBoard: async (req, res) => {
        try {
            const {boardName, description} = req.body;
            console.log(req.body);
            const user = req.user.id;

            const defaultColumns = [
                {
                    title: 'Backlog',
                    tasks: [
                        {
                            taskName: 'Add your tasks here!',
                            priority: 1,
                            taskDetail:
                                'Add more in-depth task information here!',
                        },
                    ],
                },
                {title: 'Todo', tasks: []},
                {title: 'In Progress', tasks: []},
                {title: 'Done', tasks: []},
            ];

            const board = await Board.create({
                users: [user],
                boardName,
                columns: defaultColumns,
                description,
                createdBy: user,
            });
            console.log('board created successfully!');

            console.log(board);
            res.json({board});
        } catch (error) {
            console.error(error);
        }
    },

    joinBoard: async (req, res) => {
        try {
            const {boardId} = req.body;
            const user = req.user.id;
            const board = await Board.findById(boardId);

            if (!board) {
                console.log('board not found');
                return res.status(404).json({message: 'Board not found'});
            }

            if (board.users.includes(user)) {
                return res
                    .status(400)
                    .json({message: 'User is already a member of the board'});
            }

            board.users.push(user);
            await board.save();

            return res.json({message: "User successfully joined the board"})

        } catch (error) {
            console.log('Error joining a board: ', error);
        }
    },

    // to delete a board on dashboard
    deleteBoard: async (req, res) => {
        try {
            const {boardId} = req.params;
            const board = await Board.findByIdAndDelete(boardId);
            console.log(board);
            res.json('Board successfully deleted');
        } catch (error) {
            console.error(error);
        }
    },
};
