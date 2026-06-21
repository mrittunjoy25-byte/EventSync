const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { registerEvent, listRegistrations, updateRegistration } = require('../controllers/registrationController');

const router = express.Router();

router.post('/', protect, registerEvent);
router.get('/', protect, listRegistrations);
router.put('/:id', protect, authorizeRoles('admin'), updateRegistration);

module.exports = router;
