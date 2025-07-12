const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type:       { type: String, enum: ['answer', 'comment', 'mention'], required: true },
  message:    { type: String, required: true },
  link:       { type: String }, // e.g., "/questions/123"
  isRead:     { type: Boolean, default: false },
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
