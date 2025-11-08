const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload image to Cloudinary
 * @param {String} filePath - Local file path
 * @param {String} folder - Cloudinary folder name
 * @returns {Object} - Upload result with URL
 */
const uploadImage = async (filePath, folder = 'real-estate/images') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    // Delete local file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Upload video to Cloudinary
 * @param {String} filePath - Local file path
 * @param {String} folder - Cloudinary folder name
 * @returns {Object} - Upload result with URL
 */
const uploadVideo = async (filePath, folder = 'real-estate/videos') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'video',
      transformation: [
        { width: 1280, height: 720, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    // Delete local file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Video upload failed: ${error.message}`);
  }
};

/**
 * Delete file from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 * @param {String} resourceType - 'image' or 'video'
 * @returns {Object} - Deletion result
 */
const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  uploadVideo,
  deleteFile
};