const express = require('express');
const router = express.Router();
const {
  getGallery,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} = require('../controllers/galleryController');
const { validateGallery } = require('../validations/galleryValidation');
const { protectDoctor } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public Route
router.get('/', getGallery);

// Protected Doctor Dashboard Routes
router.post('/', protectDoctor, upload.single('image'), validateGallery, uploadGalleryImage);
router.put('/:id', protectDoctor, validateGallery, updateGalleryImage);
router.delete('/:id', protectDoctor, deleteGalleryImage);

module.exports = router;
