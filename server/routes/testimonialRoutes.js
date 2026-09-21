const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.route("/").get(getTestimonials).post(createTestimonial);
router.route("/:id").put(protect, admin, updateTestimonial).delete(protect, admin, deleteTestimonial);

module.exports = router;
