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
const { uploadMedia } = require('../utils/upload');

// Public routes
router.get('/', getAllProperties);
router.get('/filter', filterProperties);
router.get('/cities', getCities);
router.get('/:id', getPropertyById);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  uploadMedia.fields([
    { name: 'images', maxCount: 20 },
    { name: 'videos', maxCount: 5 }
  ]),
  createProperty
);

router.put(
  '/:id',
  protect,
  uploadMedia.fields([
    { name: 'images', maxCount: 20 },
    { name: 'videos', maxCount: 5 }
  ]),
  updateProperty
);

router.delete('/:id', protect, deleteProperty);

module.exports = router;