const {Task, Board}  = require('../models/Board')

module.exports = {
  getTasks: async (req, res) => {
    try {
      const { boardId } = req.params
      // const board = await Board.findById(boardId)
      console.log(boardId)
      const board = await Board.findById(boardId)

      if(board){
        const {tasks} = board
        return res.json(tasks)
      }

    } catch (error) {
      console.error(error)
      return false
    }
  },
  // createTask
  createTask: async (req, res) => {
    try {
      const {taskName} = req.body
      const { boardId } = req.params
      console.log(req.params);
      
      const task = await Task.create({
        taskName,
        priority: 10
      })

      const board = await Board.findByIdAndUpdate(boardId, {$push: {tasks:task}}, {upsert:true, new:true})
      console.log(board);
      return res.json(board)
    } catch (error) {
      console.error(error)
    }
  },

  // updateTask

  updateTask: async (req, res) => {
    try {
      const { boardId, taskId } = req.params
      const {taskName,priority} = req.body

      // const board = await Board.findById(boardId)
      console.log(boardId)
      const task = await Task.findByIdAndUpdate(taskId, {taskName,priority}, {new: true} )
      console.log(task)
      return res.json(task)
    } catch (error) {
      console.error(error)
      return res.status(500)
    }
  },
  // deleteTask

  deleteTask: async (req, res) => {
    try {
      const {boardId,taskId} = req.params
      const updatedBoard = await Board.findByIdAndUpdate(
        boardId,
        { $pull: { tasks: { _id: taskId } } }, // used to remove the task from the tasks array based on its _id property
        { new: true }
      )
      console.log(updatedBoard)
      return res.json(updatedBoard)
    } catch (error) {
      console.error(error)
      return res.status(500)
    }
  
}
}