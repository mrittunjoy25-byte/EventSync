const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { listAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');

const router = express.Router();

router.get('/', protect, listAnnouncements);
router.post('/', protect, authorizeRoles('admin'), createAnnouncement);
router.put('/:id', protect, authorizeRoles('admin'), updateAnnouncement);
router.delete('/:id', protect, authorizeRoles('admin'), deleteAnnouncement);

module.exports = router;
