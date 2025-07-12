const express = require('express');
const router = express.Router();
const {
  getAllTags,
  createTag
} = require('../controllers/tagController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// @route   GET /api/tags
router.get('/', getAllTags);

// @route   POST /api/tags
router.post('/', protect, isAdmin, createTag); // Only admin can create tags

module.exports = router;
