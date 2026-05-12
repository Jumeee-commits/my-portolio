const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  id: { type: Number, default: () => Date.now() },
  cover: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  githubLink: { type: String },
  webLink: { type: String },
  description: { type: String },
  techStack: { type: String }, // Storing as string for simplicity in admin panel
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
