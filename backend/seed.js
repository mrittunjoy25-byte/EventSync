const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Announcement = require('./models/Announcement');
const Registration = require('./models/Registration');

dotenv.config();

const students = [
  { name: 'Aisha Khan', email: 'aisha@example.com', password: 'password123', role: 'student', department: 'Computer Science', semester: '5', phone: '9876543210' },
  { name: 'Rohan Mehta', email: 'rohan@example.com', password: 'password123', role: 'student', department: 'Electronics', semester: '4', phone: '9876512340' },
];

const events = [
  { title: 'AI Workshop', description: 'Hands-on workshop on AI and ML.', category: 'Workshop', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), time: '10:00 AM', venue: 'Auditorium', registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), maxParticipants: 120, organizer: 'Tech Club', contact: '9998887770', status: 'Published' },
];

const announcements = [
  { title: 'Orientation Week', message: 'New orientation schedule is live on the portal.' },
];

const bcrypt = require('bcryptjs');

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Event.deleteMany();
    await Announcement.deleteMany();
    await Registration.deleteMany();

    const createdUsers = await Promise.all(
      students.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return await User.create({ ...user, password: hashedPassword });
      })
    );

    const createdEvents = await Event.insertMany(events);
    await Announcement.insertMany(announcements);
    await Registration.create({ studentId: createdUsers[0]._id, eventId: createdEvents[0]._id, status: 'Approved' });

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
