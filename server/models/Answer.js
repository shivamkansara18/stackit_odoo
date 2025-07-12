const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question:  { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content:   { type: String, required: true }, // HTML from rich text editor
  votes:     { type: Number, default: 0 },
  voters:    [{ userId: String, vote: Number }], // To track who voted what
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', answerSchema);
