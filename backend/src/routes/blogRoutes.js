const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { validateBlog } = require('../validations/blogValidation');
const { protectDoctor } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public Routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Protected Doctor Dashboard Routes
router.post('/', protectDoctor, upload.single('featuredImage'), validateBlog, createBlog);
router.put('/:id', protectDoctor, upload.single('featuredImage'), updateBlog);
router.delete('/:id', protectDoctor, deleteBlog);

module.exports = router;
