const router = require("express").Router();
const Todo = require("../models/todo");

const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo === null) {
      res.status(404).json({ message: "Cannot find Todo" });
    }
    res.todo = todo;
    next();
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

// Get all Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {}
});

// Get a specific todo
router.get("/:id", getTodo, (req, res) => {
  res.json(res.subscriber);
});

// create a new Todo
router.post("/", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  try {
    const newTodo = await todo.save();
    res.status(201).json({ newTodo });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// mark a todo as done
router.patch("/:id", getTodo, async (req, res) => {
  res.todo.finishedAt = Date.now();
  res.todo.isDone = true;

  try {
    const updatedTodo = await res.todo.save();
    res.status(201).json(updatedTodo);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// deleting a Todo
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.status(201).json({ message: `Delete Todo with Id : ${res.todo._id}` });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// clear all todos
router.delete("/", async (req, res) => {
  try {
    await Todo.remove();
    res.status(201).json({ message: "Deleted all todos successfully" });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
