const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Cloudinary Storage Configuration for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'shreyaan/gallery';

    if (
      (req.baseUrl && req.baseUrl.includes('blog')) ||
      file.fieldname === 'featuredImage'
    ) {
      folderName = 'shreyaan/blog';
    } else if (
      (req.baseUrl && req.baseUrl.includes('gallery')) ||
      file.fieldname === 'image'
    ) {
      folderName = 'shreyaan/gallery';
    }

    return {
      folder: folderName,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      resource_type: 'image',
    };
  },
});

// File Filter (Images Only)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP and GIF images are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
