const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, require: false },
  dueDate: { type: Date, required: true },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  finishedAt: { type: Date },
});

const Todo = mongoose.model("Todos", todoSchema);
module.exports = Todo;
