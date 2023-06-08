const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true },
    
  email: { 
    type: String,
     unique: true },

  password: {
    type: String,
    required: true},

  board_id: {
    type: Number,
    required: true,
  },

  profile_picture: {
    type: String,
    required: false,
  },

  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);