const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true }, // HTML from rich text editor
  tags:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);
