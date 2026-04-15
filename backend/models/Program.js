const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  duration: { type: String },
  level: { type: String },
  skills: [String],
  description: { type: String },
  students: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  certificate: { type: Boolean, default: true },
});

const ProgramSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  icon: { type: String },
  color: { type: String },
  image: { type: String }, // Cloudinary URL
  description: { type: String },
  courses: [CourseSchema],
}, { timestamps: true });

module.exports = mongoose.model('Program', ProgramSchema);
