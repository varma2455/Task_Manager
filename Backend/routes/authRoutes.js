import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
====================================
Authentication Routes
Base URL : /api/auth
====================================
*/

// Register User
// POST /api/auth/register
router.post("/register", registerUser);

// Login User
// POST /api/auth/login
router.post("/login", loginUser);

// Get Logged In User Profile
// GET /api/auth/profile
router.get("/profile", protect, getUserProfile);

export default router;