const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  banUser,
  sendAnnouncement,
  getUserReports
} = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// All admin routes protected and role-checked

// @route   GET /api/admin/users
router.get('/users', protect, isAdmin, getAllUsers);

// @route   PUT /api/admin/users/:id/ban
router.put('/users/:id/ban', protect, isAdmin, banUser);

// @route   POST /api/admin/announce
router.post('/announce', protect, isAdmin, sendAnnouncement);

// @route   GET /api/admin/reports
router.get('/reports', protect, isAdmin, getUserReports);

module.exports = router;
