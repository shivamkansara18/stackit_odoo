const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ msg: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user.id }, { isRead: true });
    res.json({ msg: 'All marked as read' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
