const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, admin, addCategory);
router.get("/", getCategories);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
