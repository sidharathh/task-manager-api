const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { body } = require("express-validator");
const protect = require("../middlewares/authMiddleware");

router.post(
  "/",
  protect,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required"),

    body("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Invalid status"),
  ],
  createTask
);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;