const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  finishedAt: { type: Date },
});

const Todo = mongoose.model("Todos", todoSchema);
module.exports = Todo;
