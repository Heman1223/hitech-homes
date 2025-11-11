const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  deletePropertyImage,
  filterProperties,
  getCities
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { uploadPropertyMedia } = require('../utils/upload');

// Public routes
router.get('/', getAllProperties);
router.get('/filter', filterProperties);
router.get('/cities', getCities);
router.get('/:id', getPropertyById);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  uploadPropertyMedia, // <-- Already includes .fields() from upload.js
  createProperty
);

router.put(
  '/:id',
  protect,
  uploadPropertyMedia, // <-- Same here
  updateProperty
);

router.delete('/:id', protect, deleteProperty);

// Delete specific image
router.delete('/:id/images/:imageIndex', protect, deletePropertyImage);

module.exports = router;