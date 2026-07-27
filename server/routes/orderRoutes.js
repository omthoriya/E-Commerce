const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  placeOrder,
  getOrder,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  getOrderByIdAdmin,
} = require("../controllers/orderController");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, placeOrder);

router.get("/", protect, getOrder);

router.get("/admin", protect, admin, getAllOrders);

router.get("/admin/:id", protect, admin, getOrderByIdAdmin);

router.get("/:id", protect, getOrderById);

router.put("/:id/status", protect, admin, updateOrderStatus);

router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;
