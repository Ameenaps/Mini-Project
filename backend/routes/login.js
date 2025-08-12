import express from "express";
const router = express.Router();
import Login from "../models/Login.js";

// User login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request body:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await Login.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// User registration
router.post("/register", async (req, res) => {
  const { email, password, role = "user", status = "active" } = req.body;
  try {
    const exists = await Login.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = new Login({ email, password, role, status });
    await user.save();
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users (for admin/testing)
router.get("/", async (req, res) => {
  try {
    const users = await Login.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
