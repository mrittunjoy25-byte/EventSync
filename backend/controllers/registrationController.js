const Registration = require('../models/Registration');
const Event = require('../models/Event');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const registerEvent = async (req, res) => {
  const { eventId } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (new Date(event.registrationDeadline) < new Date()) {
    return res.status(400).json({ message: 'Registration deadline passed' });
  }

  const existing = await Registration.findOne({ studentId: req.user._id, eventId });
  if (existing) return res.status(400).json({ message: 'Already registered' });

  const registration = await Registration.create({
  studentId: req.user._id,
  eventId,
});

const student = await User.findById(req.user._id);

// Send email
await sendEmail(
  student.email,
  'Event Registration Successful',
  `Hello ${student.name},

You have successfully registered for:

${event.title}

Venue: ${event.venue}
Date: ${new Date(event.date).toDateString()}

Thank you for registering.
`
);

res.status(201).json(registration);
};

const listRegistrations = async (req, res) => {
  const { eventId, status, page = 1, limit = 10 } = req.query;
  const query = {};
  if (req.user.role === 'student') query.studentId = req.user._id;
  if (eventId) query.eventId = eventId;
  if (status) query.status = status;

  const registrations = await Registration.find(query)
    .populate('eventId', 'title category date venue')
    .populate('studentId', 'name email department semester')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit, 10));
  const total = await Registration.countDocuments(query);
  res.json({ registrations, total, page: parseInt(page, 10), pages: Math.ceil(total / limit) });
};

const updateRegistration = async (req, res) => {
const registration = await Registration.findById(req.params.id)
  .populate('studentId')
  .populate('eventId');
  if (!registration) return res.status(404).json({ message: 'Registration not found' });

  const { status } = req.body;
  if (status) registration.status = status;
await registration.save();

await sendEmail(
  registration.studentId.email,
  `Registration ${registration.status}`,
  `Hello ${registration.studentId.name},

Your registration for "${registration.eventId.title}" has been ${registration.status}.

Venue: ${registration.eventId.venue}
Date: ${new Date(registration.eventId.date).toDateString()}

Thank you.
`
);

res.json(registration);
};

module.exports = { registerEvent, listRegistrations, updateRegistration };
