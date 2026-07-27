const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  clearCart,
} = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.put("/:id", protect, updateCart);
router.delete("/:id", protect, deleteCart);
router.delete("/",protect,clearCart)
router.get("/", protect, getCart);

module.exports = router;
