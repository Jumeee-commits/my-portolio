const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  iconName: { type: String, required: true }, // MUI icon name as string
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

module.exports = mongoose.model('Service', ServiceSchema);
