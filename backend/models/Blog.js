const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  id: { type: Number, default: () => Date.now() },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  desc: { type: String, required: true },
  cover: { type: String, required: true },
});

module.exports = mongoose.model('Blog', BlogSchema);
