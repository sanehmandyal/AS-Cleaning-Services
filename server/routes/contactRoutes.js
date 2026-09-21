const express = require("express");
const router = express.Router();
const { createContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.route("/").post(createContact).get(protect, admin, getContacts);
router.route("/:id").put(protect, admin, updateContact).delete(protect, admin, deleteContact);

module.exports = router;
