const Question = require('../models/Question');
const Tag = require('../models/Tag');
const Answer = require('../models/Answer');

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = new Question({
      title,
      description,
      tags, // array of ObjectIds
      author: req.user.id,
    });
    await question.save();
    res.status(201).json({ message: 'Question created successfully', question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('author', 'username')
      .populate('tags');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username')
      .populate('tags');

    const answers = await Answer.find({ question: req.params.id })
      .populate('author', 'username');

    res.json({ ...question.toObject(), answers });
  } catch (err) {
    res.status(404).json({ msg: 'Question not found' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getQuestionsByTag = async (req, res) => {
  try {
    const tag = await Tag.findOne({ name: req.params.tagName });
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });

    const questions = await Question.find({ tags: tag._id })
      .populate('author', 'username')
      .populate('tags');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.acceptAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    question.acceptedAnswer = req.params.answerId;
    await question.save();
    res.json({ msg: 'Answer accepted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
