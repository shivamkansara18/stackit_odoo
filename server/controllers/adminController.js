const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBanned: true });
    res.json({ msg: 'User banned' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.sendAnnouncement = async (req, res) => {
  // In practice this might push to all user dashboards or emails
  res.json({ msg: 'Announcement sent (simulated)' });
};

exports.getUserReports = async (req, res) => {
  // Placeholder: you could gather data from logs, feedback, etc.
  res.json({ report: 'Simulated user activity report' });
};
