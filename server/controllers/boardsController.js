/* eslint-disable no-console */
const {Board, Task} = require("../models/Board")


module.exports = {
  // used on the dashboard to get all the boards
    getAllBoards: async (req, res) => {
      try {

        const userId = req.user.id
        console.log(userId);
        const boards = await Board.find({users: userId})

        return res.json({boards})
        
      } catch (error) {
        console.error(error)
        return false
      }
    },

    // used on the boardForm to create a new board on Dashboard
    createBoard: async (req, res) => {
        try{
          const {boardName, description} = req.body;
          console.log(req.body);
          const user = req.user.id
          const board = await Board.create({
            users: [user],
            boardName,
            categoryStages: ["Todo", "In Progress", "Done"], 
            description,
            createdBy: user, 
          }
          )
          console.log('board created successfully!')

          console.log(board)
          res.json({board})

        } catch(error){
          console.error(error)
        }
    },

    // to delete a board on dashboard
    deleteBoard: async (req,res) => {
      try {
        const {id} = req.params
        const board = await Board.findByIdAndDelete(id)
        console.log(board);
        res.json('Board successfully deleted')
        
      } catch (error) {
        console.error(error)
      }
    },

    
    populateBoard: async (req,res) => {
      try{
        const {id} = req.params

        const board = await Board.findById(id)
        console.log(board);        
      const task1 = await Task.create({
        taskName: "Task 1"});
                                
      const task2 = await Task.create({
        taskName: "Task 2"});

        board.tasks.push(task1, task2)

        board.populate('tasks')
        await board.save()

        console.log(board);
  
        res.json({board})

      }catch(error){
        console.log(error);
      }
    }
}