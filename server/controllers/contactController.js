const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  const contact = await Contact.create({ name, email, phone, subject, message });
  res.status(201).json({ success: true, data: contact });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, count: contacts.length, data: contacts });
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Message not found");
  }
  contact.status = req.body.status || contact.status;
  const updated = await contact.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Message not found");
  }
  await contact.deleteOne();
  res.json({ success: true, message: "Message removed" });
});

module.exports = { createContact, getContacts, updateContact, deleteContact };
