const express = require('express');
const { getVaults, getVaultById, createVault, updateVault, deleteVault } = require('../controllers/vaults');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.get('/', auth, getVaults);
router.get('/:id', auth, getVaultById);
router.post('/', auth, createVault);
router.put('/:id', auth, updateVault);
router.delete('/:id', auth, deleteVault);

module.exports = router;