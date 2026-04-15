const mongoose = require('mongoose');

const CarouselSlideSchema = new mongoose.Schema({
  image: { type: String, required: true },
  badge: { type: String },
  heading1: { type: String, required: true },
  heading2: { type: String },
  accent: { type: String },
  sub: { type: String },
  cta1Label: { type: String, default: 'Join RSIC — Free' },
  cta1Href: { type: String, default: '/join' },
  cta2Label: { type: String, default: 'Explore Projects' },
  cta2Href: { type: String, default: '/projects' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('CarouselSlide', CarouselSlideSchema);
