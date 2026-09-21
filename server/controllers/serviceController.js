const asyncHandler = require("express-async-handler");
const Service = require("../models/Service");

// @desc    Get all active services (public) / all services (admin)
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const filter = req.query.all === "true" ? {} : { isActive: true };
  const services = await Service.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: services.length, data: services });
});

// @desc    Get single service by id or slug
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let service = id.match(/^[0-9a-fA-F]{24}$/)
    ? await Service.findById(id)
    : await Service.findOne({ slug: id });

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  res.json({ success: true, data: service });
});

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  Object.assign(service, req.body);
  const updated = await service.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  await service.deleteOne();
  res.json({ success: true, message: "Service removed" });
});

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
