const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  id: { type: Number, default: () => Date.now() },
  text: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  post: { type: String, required: true },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
