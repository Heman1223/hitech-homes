const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  filterProperties,
  getCities
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
// const { uploadMedia } = require('../utils/upload'); // Temporarily commented out for JSON support

// Public routes
router.get('/', getAllProperties);
router.get('/filter', filterProperties);
router.get('/cities', getCities);
router.get('/:id', getPropertyById);

// Protected routes (Admin only) - No upload middleware for now (JSON only)
router.post('/', protect, createProperty);

router.put('/:id', protect, updateProperty);

router.delete('/:id', protect, deleteProperty);

module.exports = router;