const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead
} = require('../controllers/notificationController');
const protect = require('../middleware/authMiddleware');

// @route   GET /api/notifications
router.get('/', protect, getNotifications);

// @route   PUT /api/notifications/:id/read
router.put('/:id/read', protect, markAsRead);

// @route   PUT /api/notifications/read-all
router.put('/read-all', protect, markAllAsRead);

module.exports = router;
