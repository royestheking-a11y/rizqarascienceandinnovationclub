const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String },
  shortDesc: { type: String },
  description: { type: String },
  problem: { type: String },
  solution: { type: String },
  features: [String],
  impact: { type: String },
  category: { type: String },
  tags: [String],
  status: { type: String },
  year: { type: Number },
  award: { type: String },
  image: { type: String }, // Cloudinary URL
  screenshots: [String], // Cloudinary URLs
  team: [String],
  link: { type: String },
  color: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
