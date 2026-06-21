const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { listNotifications } = require('../controllers/notificationController');

const router = express.Router();
router.get('/', protect, listNotifications);

module.exports = router;
