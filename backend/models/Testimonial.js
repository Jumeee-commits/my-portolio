const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  post: { type: String, required: true },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
