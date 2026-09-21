const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    category: { type: String, default: "Cleaning Tips" },
    author: { type: String, default: "AS Cleaning Services Team" },
    published: { type: Boolean, default: false },
    publishedDate: { type: Date },
  },
  { timestamps: true }
);

blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
