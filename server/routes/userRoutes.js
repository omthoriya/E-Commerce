const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
