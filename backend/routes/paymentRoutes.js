const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
    getAdminStats,
    getAdminRevenueChart,
    getAdminPayments,
    markOrderPaid,
    getRecentOrders,
    getSellerRevenue,
    getDeliveryEarnings,
    getCustomerSpending,
} = require("../controllers/paymentController");

// ===== ADMIN ROUTES =====
router.get("/admin/stats", protect, authorize("admin"), getAdminStats);
router.get("/admin/revenue-chart", protect, authorize("admin"), getAdminRevenueChart);
router.get("/admin/all", protect, authorize("admin"), getAdminPayments);
router.put("/admin/mark-paid", protect, authorize("admin"), markOrderPaid);
router.get("/admin/recent-orders", protect, authorize("admin"), getRecentOrders);

// ===== SELLER ROUTES =====
router.get("/seller/revenue", protect, authorize("seller"), getSellerRevenue);

// ===== DELIVERY ROUTES =====
router.get("/delivery/earnings", protect, authorize("delivery"), getDeliveryEarnings);

// ===== CUSTOMER ROUTES =====
router.get("/customer/spending", protect, authorize("customer"), getCustomerSpending);

module.exports = router;
