const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  companyName: { type: String },
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  issueDate: { type: String, required: true },
  memberId: { type: String }, // Optional, linking to a member if logged in
  score: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
