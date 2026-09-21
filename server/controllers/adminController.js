const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Contact = require("../models/Contact");
const Service = require("../models/Service");

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalBookings, pendingBookings, confirmedBookings, completedBookings, cancelledBookings, totalCustomers] =
    await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Confirmed" }),
      Booking.countDocuments({ status: "Completed" }),
      Booking.countDocuments({ status: "Cancelled" }),
      User.countDocuments({ role: "customer" }),
    ]);

  const revenueAgg = await Booking.aggregate([
    { $match: { status: "Completed" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  const totalRevenue = revenueAgg[0]?.total || 0;

  // Monthly bookings for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const monthlyBookings = await Booking.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const servicePopularity = await Booking.aggregate([
    { $group: { _id: "$service", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 6 },
    {
      $lookup: {
        from: "services",
        localField: "_id",
        foreignField: "_id",
        as: "service",
      },
    },
    { $unwind: { path: "$service", preserveNullAndEmptyArrays: true } },
    { $project: { count: 1, title: "$service.title" } },
  ]);

  res.json({
    success: true,
    data: {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalCustomers,
      totalServices: await Service.countDocuments(),
      totalRevenue,
      monthlyBookings,
      servicePopularity,
    },
  });
});

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Private/Admin
const getCustomers = asyncHandler(async (req, res) => {
  const filter = { role: "customer" };
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ];
  }
  const customers = await User.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: customers.length, data: customers });
});

// @desc    Get single customer with bookings
// @route   GET /api/admin/customers/:id
// @access  Private/Admin
const getCustomerDetails = asyncHandler(async (req, res) => {
  const customer = await User.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }
  const bookings = await Booking.find({ user: customer._id }).populate("service", "title price");
  res.json({ success: true, data: { customer, bookings } });
});

// @desc    Deactivate / reactivate a customer
// @route   PUT /api/admin/customers/:id
// @access  Private/Admin
const toggleCustomerStatus = asyncHandler(async (req, res) => {
  const customer = await User.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }
  customer.isActive = req.body.isActive !== undefined ? req.body.isActive : !customer.isActive;
  const updated = await customer.save();
  res.json({ success: true, data: updated });
});

module.exports = {
  getDashboardStats,
  getCustomers,
  getCustomerDetails,
  toggleCustomerStatus,
};
