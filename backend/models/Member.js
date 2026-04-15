const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  customId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Member' },
  joinDate: { type: String, default: () => new Date().toISOString() },
  country: { type: String, required: true },
  whatsapp: { type: String },
  school: { type: String, required: true },
  enrolledCourses: [{ type: String }],
  interests: [{ type: String }],
  activityLog: [{ 
    id: String,
    type: { type: String, default: 'action' },
    date: { type: String, default: () => new Date().toISOString() },
    description: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);
