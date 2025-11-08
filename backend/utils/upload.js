const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// File filter for videos
const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|wmv|flv|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('video/');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only video files are allowed (mp4, mov, avi, wmv, flv, mkv)'));
  }
};

// File filter for both images and videos
const mediaFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp/;
  const videoTypes = /mp4|mov|avi|wmv|flv|mkv/;
  const extname = path.extname(file.originalname).toLowerCase();
  
  const isImage = imageTypes.test(extname) && file.mimetype.startsWith('image/');
  const isVideo = videoTypes.test(extname) && file.mimetype.startsWith('video/');

  if (isImage || isVideo) {
    return cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'));
  }
};

// Upload configurations
const uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for images
  }
});

const uploadVideo = multer({
  storage: storage,
  fileFilter: videoFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for videos
  }
});

const uploadMedia = multer({
  storage: storage,
  fileFilter: mediaFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

module.exports = {
  uploadImage,
  uploadVideo,
  uploadMedia
};