const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  customId: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false },
  year: { type: Number },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
