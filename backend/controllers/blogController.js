const Blog = require('../models/Blog');

const getBlog = async (req, res, next) => {
  try {
    const posts = await Blog.find().sort({ id: 1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const post = await Blog.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBlog, createBlog, updateBlog, deleteBlog };
