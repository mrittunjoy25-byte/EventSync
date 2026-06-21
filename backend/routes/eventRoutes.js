const express = require('express');
const { body } = require('express-validator');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { listEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

router.get('/', protect, listEvents);
router.get('/:id', protect, getEvent);
router.post(
  '/',
  protect,
  authorizeRoles('admin'),
  upload.single('banner'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createEvent
);
router.put('/:id', protect, authorizeRoles('admin'), upload.single('banner'), updateEvent);
router.delete('/:id', protect, authorizeRoles('admin'), deleteEvent);

module.exports = router;
