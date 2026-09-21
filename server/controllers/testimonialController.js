const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/Testimonial");

// @desc    Get approved testimonials (public) / all (admin)
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const filter = req.query.all === "true" ? {} : { isApproved: true };
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, role, image, rating, message } = req.body;
  if (!name || !message) {
    res.status(400);
    throw new Error("Please provide name and message");
  }
  const testimonial = await Testimonial.create({ name, role, image, rating, message });
  res.status(201).json({ success: true, data: testimonial });
});

// @desc    Update testimonial (approve/edit)
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }
  Object.assign(testimonial, req.body);
  const updated = await testimonial.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }
  await testimonial.deleteOne();
  res.json({ success: true, message: "Testimonial removed" });
});

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
