const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  customId: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String },
  date: { type: String },
  endDate: { type: String },
  time: { type: String },
  location: { type: String },
  description: { type: String },
  image: { type: String },
  capacity: { type: Number },
  registered: { type: Number, default: 0 },
  speakers: [{ type: String }],
  tags: [{ type: String }],
  status: { type: String },
  price: { type: String },
  color: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
