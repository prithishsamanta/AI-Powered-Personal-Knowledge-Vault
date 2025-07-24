const express = require('express');
const { generateSummary } = require('../controllers/generatesummary');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.post('/:id/generate-summary', auth, generateSummary);

module.exports = router;