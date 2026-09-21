const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getCustomers,
  getCustomerDetails,
  toggleCustomerStatus,
} = require("../controllers/adminController");
const { getBookings } = require("../controllers/bookingController");
const { getContacts } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.use(protect, admin);

router.get("/dashboard", getDashboardStats);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerDetails);
router.put("/customers/:id", toggleCustomerStatus);
router.get("/bookings", getBookings);
router.get("/messages", getContacts);

module.exports = router;
