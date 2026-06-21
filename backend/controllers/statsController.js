const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

const getStats = async (req, res) => {
  try {
    const students = await User.countDocuments({
      role: 'student',
    });

    const events = await Event.countDocuments();

    const registrations = await Registration.countDocuments({
      status: 'Pending',
    });

    res.json({
      students,
      events,
      registrations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

module.exports = { getStats };