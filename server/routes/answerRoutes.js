const express = require('express');
const router = express.Router();
const {
  postAnswer,
  voteAnswer
} = require('../controllers/answerController');
const protect = require('../middleware/authMiddleware');

// @route   POST /api/answers/:questionId
router.post('/:questionId', protect, postAnswer);

// @route   PUT /api/answers/:id/vote
router.put('/:id/vote', protect, voteAnswer);

module.exports = router;
