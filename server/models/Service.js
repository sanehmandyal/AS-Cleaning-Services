const mongoose = require("mongoose");
const slugify = require("slugify");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    icon: { type: String, default: "FaBroom" },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: "starting at" },
    duration: { type: String, default: "1-2 hours" },
    features: [{ type: String }],
    included: [{ type: String }],
    excluded: [{ type: String }],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    category: { type: String, default: "popular" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.pre("validate", async function (next) {
  if (this.title && (!this.slug || this.isModified("title"))) {
    let baseSlug = slugify(this.title, { lower: true, strict: true }) || "service";
    let slug = baseSlug;
    try {
      const existing = await this.constructor.findOne({ slug, _id: { $ne: this._id } });
      if (existing) {
        slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      }
    } catch (e) {
      // fallback
    }
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Service", serviceSchema);
