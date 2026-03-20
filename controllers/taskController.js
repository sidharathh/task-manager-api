const Task = require("../models/task");
const { validationResult } = require("express-validator");

// Create Task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
  try {
    const { title, description } = req.body;

    // create task linked to logged-in user
    const task = await Task.create({
      title,
      description,
      user: req.user.id, // from JWT middleware
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks of logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update fields
    const { title, description, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // delete task
    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;

    // build filter object
    const filter = { user: req.user.id };

    if (status) {
      filter.status = status; // pending or completed
    }

    // pagination logic
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};