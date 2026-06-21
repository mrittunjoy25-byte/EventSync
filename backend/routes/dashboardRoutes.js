const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { getStats } = require('../controllers/dashboardController');

const router = express.Router();
router.get('/stats', protect, authorizeRoles('admin'), getStats);

module.exports = router;
