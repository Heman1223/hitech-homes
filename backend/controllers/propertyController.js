const Property = require('../models/Property');
const { uploadImage, uploadVideo } = require('../utils/cloudinary');

/**
 * @desc    Get all properties with pagination
 * @route   GET /api/properties
 * @access  Public
 */
const getAllProperties = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments();

    res.json({
      success: true,
      count: properties.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: properties
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single property by ID
 * @route   GET /api/properties/:id
 * @access  Public
 */
const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new property
 * @route   POST /api/properties
 * @access  Private (Admin only)
 */
const createProperty = async (req, res, next) => {
  try {
    const { title, description, price, bhk, bathrooms, city, address } = req.body;

    // Validation
    if (!title || !description || !price || !bhk || !bathrooms || !city || !address) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Handle file uploads
    let imageUrls = [];
    let videoUrls = [];

    if (req.files) {
      // Upload images
      if (req.files.images) {
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        for (const file of images) {
          const result = await uploadImage(file.path);
          imageUrls.push(result.url);
        }
      }

      // Upload videos
      if (req.files.videos) {
        const videos = Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos];
        for (const file of videos) {
          const result = await uploadVideo(file.path);
          videoUrls.push(result.url);
        }
      }
    }

    const property = await Property.create({
      title,
      description,
      price: parseFloat(price),
      bhk: parseInt(bhk),
      bathrooms: parseInt(bathrooms),
      city,
      address,
      images: imageUrls,
      videos: videoUrls
    });

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update property
 * @route   PUT /api/properties/:id
 * @access  Private (Admin only)
 */
const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    const { title, description, price, bhk, bathrooms, city, address } = req.body;

    // Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = parseFloat(price);
    if (bhk) property.bhk = parseInt(bhk);
    if (bathrooms) property.bathrooms = parseInt(bathrooms);
    if (city) property.city = city;
    if (address) property.address = address;

    // Handle new file uploads
    if (req.files) {
      if (req.files.images) {
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        for (const file of images) {
          const result = await uploadImage(file.path);
          property.images.push(result.url);
        }
      }

      if (req.files.videos) {
        const videos = Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos];
        for (const file of videos) {
          const result = await uploadVideo(file.path);
          property.videos.push(result.url);
        }
      }
    }

    await property.save();

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete property
 * @route   DELETE /api/properties/:id
 * @access  Private (Admin only)
 */
const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    await property.deleteOne();

    res.json({
      success: true,
      message: 'Property deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Filter properties by city and price
 * @route   GET /api/properties/filter
 * @access  Public
 */
const filterProperties = async (req, res, next) => {
  try {
    const { city, minPrice, maxPrice, bhk, sort } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter query
    let query = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (bhk) {
      query.bhk = parseInt(bhk);
    }

    // Build sort query
    let sortQuery = { createdAt: -1 }; // Default: newest first

    if (sort === 'price_asc') {
      sortQuery = { price: 1 };
    } else if (sort === 'price_desc') {
      sortQuery = { price: -1 };
    } else if (sort === 'bhk_asc') {
      sortQuery = { bhk: 1 };
    } else if (sort === 'bhk_desc') {
      sortQuery = { bhk: -1 };
    }

    const properties = await Property.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      count: properties.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      filters: { city, minPrice, maxPrice, bhk, sort },
      data: properties
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get cities list
 * @route   GET /api/properties/cities
 * @access  Public
 */
const getCities = async (req, res, next) => {
  try {
    const cities = await Property.distinct('city');

    res.json({
      success: true,
      count: cities.length,
      data: cities.sort()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  filterProperties,
  getCities
};