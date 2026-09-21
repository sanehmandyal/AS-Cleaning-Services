const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

// @desc    Get all published blogs (public) / all (admin)
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const filter = req.query.all === "true" ? {} : { published: true };
  const blogs = await Blog.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: blogs.length, data: blogs });
});

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  res.json({ success: true, data: blog });
});

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    publishedDate: req.body.published ? new Date() : undefined,
  });
  res.status(201).json({ success: true, data: blog });
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  const wasPublished = blog.published;
  Object.assign(blog, req.body);
  if (!wasPublished && blog.published) {
    blog.publishedDate = new Date();
  }
  const updated = await blog.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  await blog.deleteOne();
  res.json({ success: true, message: "Blog post removed" });
});

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
