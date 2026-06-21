const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

const getStats = async (req, res) => {
  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalEvents = await Event.countDocuments();
  const totalRegistrations = await Registration.countDocuments();
  const activeEvents = await Event.countDocuments({ status: 'Published', date: { $gte: new Date() } });
  const completedEvents = await Event.countDocuments({ date: { $lt: new Date() } });
  const pendingRegistrations = await Registration.countDocuments({ status: 'Pending' });

  const categoryDistribution = await Event.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  const monthlyRegistrations = await Registration.aggregate([
    { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  const participationStats = await Registration.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.json({
    totalStudents,
    totalEvents,
    totalRegistrations,
    activeEvents,
    completedEvents,
    pendingRegistrations,
    categoryDistribution,
    monthlyRegistrations,
    participationStats,
  });
};

module.exports = { getStats };
