const express = require('express');
const app = express()
// use .env file in config folder
require('dotenv').config({ path: './config/.env' });
const PORT = process.env.SERVER_PORT || 5000
const mongoose = require('mongoose');
const cors = require('cors')
const logger = require('morgan')
const User = require('./models/user');
const Board = require("./models/Board"); 

const connectDB = require('./config/database')
const User = require('./models/user');
const Board = require("./models/Board"); 


//connect to database
connectDB()



app.use(cors());

// body parsing
app.use(express.json());

//logging
app.use(logger('dev'))

// test routes
app.get('/da' , (req,res) => {
  res.json('hello')
})
app.get('/test', (req,res) => {
  res.json('Testing 123')
})



// Create a new test user instance
// const newTestUser = new User({
  // userName: "john_doe",
  // email: "johndoe@example.com",
  // password: "password123",
  // board_id: testBoard,
  // profile_picture: "profile.jpg",
  // first_name: "John",
  // last_name: "Doe",
// });

// Save the user instance to the database
// newTestUser.save()
//   .then(savedUser => {
//     console.log("User saved successfully:", savedUser);
//   })
//   .catch(error => {
//     console.error("Error saving user:", error);
//   });

// Create a new board instance
// const testBoard = new Board({
//   // user_ids: ["user1", "user2"],
//   board_name: "My Kanban Board",
//   category_stages: ["To Do", "In Progress", "Done"],
//   likes: 0,
//   user: new mongoose.Types.ObjectId(),
//   task: {
//     task_name: "Task 1",
//     assigned_user_id: ["user1"],
//     board_id: new mongoose.Types.ObjectId(),
//     due_date: new Date(),
//     priority: 1,
//     category_stage: "To Do",
//     tags: ["tag1", "tag2"],
//     task_detail: "Task details",
//     comments: {
//       comment_date: new Date(),
//       task_detail: "Comment 1",
//       created_by: new mongoose.Types.ObjectId(),
//       task_id: new mongoose.Types.ObjectId(),
//       reply_user_id: ["user2"],
//       reply_date: new Date(),
//     },
//   },
// });

// Save the board instance to the database
// testBoard.save()
//   .then(savedBoard => {
//     console.log("Board saved successfully:", savedBoard);
//   })
//   .catch(error => {
//     console.error("Error saving board:", error);
//   });

app.post('/hello' , async (req, res) => {
  const body = req.body
  const newTestUser = await User.create({
    userName: body.userName,
    email: body.email,
    password: body.password,
    board_id: body.board_id,
    first_name: body.first_name,
    last_name: body.last_name,
  })
  
  console.log(newTestUser)
  res.redirect('/')
})



app.get('/schematest', (req, res) => {
  const data = req.body
  res.json(data);
  console.log
});



app.listen(PORT, () => console.log(`Server is running on ${PORT}, you better catch it!`));