const { validationResult } = require('express-validator');
const Event = require('../models/Event');

const listEvents = async (req, res) => {
  const { search, category, date, venue, status, page = 1, limit = 10 } = req.query;
  const query = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  if (category) query.category = category;
  if (date) query.date = { $eq: new Date(date) };
  if (venue) query.venue = { $regex: venue, $options: 'i' };
  if (status) query.status = status;

  const events = await Event.find(query)
    .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit, 10));
  const total = await Event.countDocuments(query);
  res.json({ events, total, page: parseInt(page, 10), pages: Math.ceil(total / limit) });
};

const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

const createEvent = async (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const event = new Event({
    ...req.body,
    banner: req.file
      ? `/uploads/${req.file.filename}`
      : req.body.banner || '',
  });

  await event.save();

  res.status(201).json(event);
};

const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  Object.assign(event, req.body);
  if (req.file) event.banner = `/uploads/${req.file.filename}`;
  await event.save();
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      message: 'Event not found',
    });
  }

  await Event.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Event deleted successfully',
  });
};

module.exports = { listEvents, getEvent, createEvent, updateEvent, deleteEvent };
