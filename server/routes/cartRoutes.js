const express = require("express");
const router = express.Router();

const protest = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  clearCart,
} = require("../controllers/cartController");

router.post("/", protest, addToCart);
router.put("/:id", protest, updateCart);
router.delete("/:id",protest,deleteCart);
router.delete("/",protest,clearCart)
router.get("/", protest, getCart);

module.exports = router;
