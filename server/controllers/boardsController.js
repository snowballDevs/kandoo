/* eslint-disable no-console */
const {Board} = require('../models/Board');
const User = require('../models/User');

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
                            priority: 'medium',
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

            const usersWithNames = await getUserNamesByIds(board.users);

            res.json({board, usersWithNames});
        } catch (error) {
            console.error(error);
        }
    },

    joinBoard: async (req, res) => {
        try {
            const {boardId} = req.body;
            const userId = req.user.id;

            const board = await Board.findById(boardId);
            if (!board) {
                return res.status(404).json({message: 'Board not found'});
            }

            if (board.users.includes(userId)) {
                return res
                    .status(400)
                    .json({message: 'User is already a member of the board'});
            }

            board.users.push(userId);
            await board.save();

            // Need to ensure that we are sending back the board so that the user can automatically open the board on joining
            return res.json({
                board,
                message: 'User successfully joined the board',
            });
        } catch (error) {
            console.log('Error joining a board:', error);
        }
    },

    getBoardUserNames: async (req, res) => {
        try {
            const {boardId} = req.params;
            const board = await Board.findById(boardId);

            if (!board) {
                return res.status(404).json({message: 'Board not found'});
            }

            console.log('User model:', User);
            console.log('userId:', board.users);

            const userNames = await Promise.all(
                board.users.map(async (userId) => {
                    console.log('userId:', userId);
                    const user = await User.findOne({ _id: userId });
            
                    console.log('user:', user);

                    if (user) {
                        return {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        };
                    }
                    return null;
                })
            );

            console.log('userNames:', userNames);
            return res.json(userNames.filter(Boolean));
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal server error'});
        }
    },

    updateBoard: async (req, res) => {
        try {
            const {boardId} = req.params;
            const {boardName, description} = req.body;
            const board = await Board.findById(boardId);
            if (board) {
                board.boardName = boardName;
                board.description = description;
                await board.save();
                return res.json({board, message: 'Board updated'});
            }
        } catch (error) {
            console.error(error);
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
