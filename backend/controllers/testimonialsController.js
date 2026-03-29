const Testimonial = require('../models/Testimonial');

// GET /api/testimonials
const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ id: 1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTestimonials };
