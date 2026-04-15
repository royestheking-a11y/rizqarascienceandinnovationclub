const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  customId: { type: String, required: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String },
  author: { type: String },
  date: { type: String },
  readTime: { type: String },
  category: { type: String },
  image: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
