const asyncHandler = require("express-async-handler");
const Booking = require("../models/Booking");
const Service = require("../models/Service");

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public (customer optional if logged in)
const createBooking = asyncHandler(async (req, res) => {
  const {
    service,
    customerName,
    email,
    phone,
    address,
    propertyType,
    bookingDate,
    bookingTime,
    rooms,
    notes,
  } = req.body;

  if (!service || !customerName || !email || !phone || !address || !bookingDate || !bookingTime) {
    res.status(400);
    throw new Error("Please fill in all required booking fields");
  }

  let serviceDoc = null;
  if (service && typeof service === "string") {
    if (service.match(/^[0-9a-fA-F]{24}$/)) {
      serviceDoc = await Service.findById(service);
    }
    if (!serviceDoc) {
      serviceDoc = await Service.findOne({
        $or: [
          { slug: service },
          { title: { $regex: new RegExp(`^${service.replace(/[-_]/g, " ")}$`, "i") } },
          { title: { $regex: new RegExp(service, "i") } },
        ],
      });
    }
  }
  if (!serviceDoc) {
    serviceDoc = await Service.findOne({ isActive: true });
  }
  if (!serviceDoc) {
    serviceDoc = await Service.create({
      title: "General Cleaning",
      shortDescription: "Professional cleaning service",
      description: "Professional cleaning service for home or commercial space",
      image: "/images/services/deep-cleaning.jpg",
      price: 1999,
    });
  }

  const booking = await Booking.create({
    user: req.user ? req.user._id : undefined,
    service: serviceDoc._id,
    customerName,
    email,
    phone,
    address,
    propertyType,
    bookingDate,
    bookingTime,
    rooms,
    notes,
    totalAmount: serviceDoc.price || 0,
  });

  res.status(201).json({ success: true, data: booking });
});

// @desc    Get bookings (own bookings for customer, all for admin)
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.user.role !== "admin") {
    filter = { user: req.user._id };
  } else {
    if (req.query.status) filter.status = req.query.status;
    if (req.query.service) filter.service = req.query.service;
    if (req.query.search) {
      filter.$or = [
        { customerName: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.date) {
      const start = new Date(req.query.date);
      const end = new Date(req.query.date);
      end.setDate(end.getDate() + 1);
      filter.bookingDate = { $gte: start, $lt: end };
    }
  }

  const bookings = await Booking.find(filter)
    .populate("service", "title price image")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, data: bookings });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("service");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  if (req.user.role !== "admin" && (!booking.user || booking.user.toString() !== req.user._id.toString())) {
    res.status(403);
    throw new Error("Not authorized to view this booking");
  }
  res.json({ success: true, data: booking });
});

// @desc    Update booking (status change or cancel)
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const isOwner = booking.user && booking.user.toString() === req.user._id.toString();

  if (req.user.role !== "admin") {
    if (!isOwner) {
      res.status(403);
      throw new Error("Not authorized to update this booking");
    }
    // Customers may only cancel their own bookings
    if (req.body.status && req.body.status !== "Cancelled") {
      res.status(403);
      throw new Error("Customers can only cancel bookings");
    }
    booking.status = "Cancelled";
  } else {
    Object.assign(booking, req.body);
  }

  const updated = await booking.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  await booking.deleteOne();
  res.json({ success: true, message: "Booking removed" });
});

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
