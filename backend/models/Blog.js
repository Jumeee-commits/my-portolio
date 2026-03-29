const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  desc: { type: String, required: true },
  cover: { type: String, required: true },
});

module.exports = mongoose.model('Blog', BlogSchema);
