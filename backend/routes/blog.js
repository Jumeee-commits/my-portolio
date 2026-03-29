const express = require('express');
const router = express.Router();
const { getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getBlog)
  .post(protect, createBlog);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
