const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  customId: { type: Number, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image: { type: String }, // Cloudinary URL
  expertise: [String],
  social: {
    linkedin: String,
    github: String,
    twitter: String
  },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamSchema);
