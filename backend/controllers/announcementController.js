const Announcement = require('../models/Announcement');

const listAnnouncements = async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  res.json(announcements);
};

const createAnnouncement = async (req, res) => {
  const announcement = await Announcement.create(req.body);
  res.status(201).json(announcement);
};

const updateAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

  announcement.title = req.body.title || announcement.title;
  announcement.message = req.body.message || announcement.message;
  await announcement.save();
  res.json(announcement);
};

const deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
  await announcement.remove();
  res.json({ message: 'Announcement deleted' });
};

module.exports = { listAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };
