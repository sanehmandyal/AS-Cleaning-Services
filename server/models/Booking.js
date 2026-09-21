const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Office", "Commercial Space", "Other"],
      default: "House",
    },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    rooms: { type: Number, default: 1 },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
