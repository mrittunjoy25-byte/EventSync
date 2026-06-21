const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json(req.user);
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, department, semester, phone } = req.body;
  if (name) user.name = name;
  if (department) user.department = department;
  if (semester) user.semester = semester;
  if (phone) user.phone = phone;
  if (req.file) user.profileImage = `/uploads/${req.file.filename}`;

  await user.save();
  res.json(user);
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const matched = await bcrypt.compare(currentPassword, user.password);
  if (!matched) return res.status(400).json({ message: 'Current password is incorrect' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password changed successfully' });
};

module.exports = { getProfile, updateProfile, changePassword };
