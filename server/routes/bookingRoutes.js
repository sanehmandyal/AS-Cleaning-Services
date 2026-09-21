const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Booking creation allowed for guests too, but we try to attach user if token provided
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    return protect(req, res, next);
  }
  next();
};

router.route("/").post(optionalAuth, createBooking).get(protect, getBookings);
router
  .route("/:id")
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, admin, deleteBooking);

module.exports = router;
