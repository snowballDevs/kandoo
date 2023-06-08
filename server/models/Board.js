const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  user_ids: {
    type: Array,
    required: true,
  },
  board_name: {
    type: String,
    require: true,
  },
  category_stages: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date, //Expected output: "Fri, 02 Feb 1996 03:04:05 GMT"
    default: Date.now,
  },
});

module.exports = mongoose.model("Board", BoardSchema); //TODO: change "board"