const Blog = require('../models/Blog');

// GET /api/blog
const getBlog = async (req, res, next) => {
  try {
    const posts = await Blog.find().sort({ id: 1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBlog };
