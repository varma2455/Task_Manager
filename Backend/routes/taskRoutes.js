import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  searchTasks,
  filterTasks,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
====================================
Task Routes
Base URL : /api/tasks
====================================
*/

// All routes below require authentication
router.use(protect);

// ---------------------------------
// Create Task
// POST /api/tasks
// ---------------------------------
router.post("/", createTask);

// ---------------------------------
// Get All Tasks
// GET /api/tasks
// ---------------------------------
router.get("/", getTasks);

// ---------------------------------
// Search Tasks
// GET /api/tasks/search?keyword=task
// ---------------------------------
router.get("/search", searchTasks);

// ---------------------------------
// Filter Tasks
// GET /api/tasks/filter?status=Pending&priority=High
// ---------------------------------
router.get("/filter", filterTasks);

// ---------------------------------
// Get Single Task
// GET /api/tasks/:id
// ---------------------------------
router.get("/:id", getTaskById);

// ---------------------------------
// Update Task
// PUT /api/tasks/:id
// ---------------------------------
router.put("/:id", updateTask);

// ---------------------------------
// Update Task Status
// PATCH /api/tasks/:id/status
// ---------------------------------
router.patch("/:id/status", updateTaskStatus);

// ---------------------------------
// Delete Task
// DELETE /api/tasks/:id
// ---------------------------------
router.delete("/:id", deleteTask);

export default router;