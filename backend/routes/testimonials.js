const express = require('express');
const router = express.Router();
const { getTestimonials } = require('../controllers/testimonialsController');

router.get('/', getTestimonials);

module.exports = router;
