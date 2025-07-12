const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
  getQuestionsByTag,
  acceptAnswer
} = require('../controllers/questionController');
const protect = require('../middleware/authMiddleware');

// @route   GET /api/questions
router.get('/', getAllQuestions);

// @route   POST /api/questions
router.post('/', protect, createQuestion);

// @route   GET /api/questions/:id
router.get('/:id', getQuestionById);

// @route   DELETE /api/questions/:id
router.delete('/:id', protect, deleteQuestion);

// @route   GET /api/questions/tag/:tagName
router.get('/tag/:tagName', getQuestionsByTag);

// @route   PUT /api/questions/:id/accept/:answerId
router.put('/:id/accept/:answerId', protect, acceptAnswer);

module.exports = router;
