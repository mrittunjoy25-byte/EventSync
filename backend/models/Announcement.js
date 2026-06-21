const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
