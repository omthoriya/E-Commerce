const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", protect, admin, addCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
