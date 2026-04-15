const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  project: { type: String },
  date: { type: String },
  event: { type: String },
  organizer: { type: String },
  location: { type: String },
  description: { type: String },
  category: { type: String },
  image: { type: String }, // Cloudinary URL
  certificateImage: { type: String }, // Cloudinary URL
  eventImage: { type: String }, // Cloudinary URL
  level: { type: String },
  prize: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
