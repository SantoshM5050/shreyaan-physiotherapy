const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

let inMemoryGallery = [
  {
    _id: 'gal-1',
    title: 'Consultation & Assessment Area',
    imageUrl: '/images/gallery/clinic-1.jpg',
    category: 'Clinic',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'gal-2',
    title: 'Modern Electrotherapy Equipment',
    imageUrl: '/images/gallery/equipment-1.jpg',
    category: 'Equipment',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'gal-3',
    title: 'Spinal Decompression & Rehab Session',
    imageUrl: '/images/gallery/treatment-1.jpg',
    category: 'Treatment',
    createdAt: new Date().toISOString(),
  },
];

const isDemoEnabled = () =>
  process.env.NODE_ENV !== 'production' &&
  (process.env.ENABLE_DEMO_GALLERY === 'true' || process.env.ALLOW_DEMO_DATA === 'true');

const extractCloudinaryPublicId = (url, storedPublicId) => {
  if (storedPublicId && typeof storedPublicId === 'string' && !storedPublicId.startsWith('/')) {
    return storedPublicId;
  }
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return null;
  }
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    let path = parts[1];
    path = path.replace(/^v\d+\//, '');
    const lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
      path = path.substring(0, lastDot);
    }
    return path;
  } catch {
    return null;
  }
};

// @desc    Get All Gallery Items (Filtered by category if provided)
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;

    try {
      const query = category ? { category } : {};
      const items = await Gallery.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: items.length,
        gallery: items,
      });
    } catch {
      if (!isDemoEnabled()) {
        return res.status(200).json({
          success: true,
          count: 0,
          gallery: [],
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(200).json({
        success: true,
        count: 0,
        gallery: [],
      });
    }

    let items = [...inMemoryGallery];
    if (category) {
      items = items.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      count: items.length,
      gallery: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload / Add Gallery Image (Doctor Protected) - Cloudinary Storage Supported
// @route   POST /api/gallery
// @access  Protected
const uploadGalleryImage = async (req, res, next) => {
  try {
    const { title, category } = req.body;

    let imageUrl = req.body.imageUrl;
    let publicId = '';

    if (req.file) {
      imageUrl = req.file.path || req.file.secure_url;
      publicId = req.file.filename || req.file.public_id || '';
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'An image file or valid image URL is required.',
      });
    }

    let newItem;

    try {
      newItem = await Gallery.create({
        title: title || 'Clinical Image',
        imageUrl,
        category: category || 'Clinic',
        publicId,
        uploadedBy: req.user?.id,
      });

      return res.status(201).json({
        success: true,
        message: 'Gallery image uploaded successfully to MongoDB via Cloudinary.',
        galleryItem: newItem,
      });
    } catch (dbError) {
      if (!isDemoEnabled()) {
        return next(dbError);
      }

      newItem = {
        _id: `gal-${Date.now()}`,
        title: title || 'Clinical Image',
        imageUrl,
        category: category || 'Clinic',
        publicId,
        createdAt: new Date().toISOString(),
      };

      inMemoryGallery.unshift(newItem);

      return res.status(201).json({
        success: true,
        message: 'Gallery image uploaded successfully.',
        galleryItem: newItem,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Edit Gallery Item Title / Category (Doctor Protected)
// @route   PUT /api/gallery/:id
// @access  Protected
const updateGalleryImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    try {
      const item = await Gallery.findByIdAndUpdate(
        id,
        { title, category },
        { new: true, runValidators: true }
      );
      if (item) {
        return res.status(200).json({
          success: true,
          message: 'Gallery item updated successfully.',
          galleryItem: item,
        });
      }
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Gallery item not found.',
        });
      }
    } catch {
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Gallery item not found.',
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    const index = inMemoryGallery.findIndex((g) => g._id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    if (title) inMemoryGallery[index].title = title;
    if (category) inMemoryGallery[index].category = category;

    return res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully.',
      galleryItem: inMemoryGallery[index],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Gallery Image (Doctor Protected) - Cloudinary Supported
// @route   DELETE /api/gallery/:id
// @access  Protected
const deleteGalleryImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Gallery.findByIdAndDelete(id);
      if (deleted) {
        // Destroy from Cloudinary if valid publicId exists or extracted from Cloudinary URL
        const targetPublicId = extractCloudinaryPublicId(deleted.imageUrl, deleted.publicId);
        if (targetPublicId) {
          try {
            const cloudinary = require('../config/cloudinary');
            await cloudinary.uploader.destroy(targetPublicId);
          } catch (cloudinaryErr) {
            console.warn(`[Cloudinary Destroy Warning] ${cloudinaryErr.message}`);
          }
        }

        return res.status(200).json({
          success: true,
          message: 'Gallery image deleted successfully from MongoDB and Cloudinary.',
        });
      }
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Gallery item not found.',
        });
      }
    } catch {
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Gallery item not found.',
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    const initialLen = inMemoryGallery.length;
    inMemoryGallery = inMemoryGallery.filter((g) => g._id !== id);

    if (inMemoryGallery.length !== initialLen) {
      return res.status(200).json({
        success: true,
        message: 'Gallery image deleted successfully.',
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Gallery item not found.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGallery,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
};
