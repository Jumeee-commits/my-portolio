const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialsController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getTestimonials)
  .post(protect, createTestimonial);

router.route('/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

module.exports = router;
