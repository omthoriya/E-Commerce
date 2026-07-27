const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { getDashboard, getRecentOrders } = require("../controllers/adminController");

router.get("/dashboard", protect, admin, getDashboard);
router.get("/recent-orders", protect, admin, getRecentOrders);


module.exports = router;