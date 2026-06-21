const Notification = require('../models/Notification');

const listNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(notifications);
};

module.exports = { listNotifications };
