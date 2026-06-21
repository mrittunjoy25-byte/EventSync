const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Hackathon', 'Debate', 'Other'] },
    banner: { type: String, default: '' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    registrationDeadline: { type: Date, required: true },
    maxParticipants: { type: Number, required: true, min: 1 },
    organizer: { type: String, trim: true, required: true },
    contact: { type: String, trim: true, required: true },
    status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
