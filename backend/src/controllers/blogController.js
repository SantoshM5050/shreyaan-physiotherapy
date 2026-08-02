const Blog = require('../models/Blog');
const slugify = require('slugify');

// In-Memory Fallback Blog Store
let inMemoryBlogs = [
  {
    _id: 'blog-1',
    title: '5 Essential Exercises for Lower Back Pain Relief',
    slug: 'exercises-for-lower-back-pain',
    content: '<p>Lower back pain is one of the most common reasons patients visit our physiotherapy clinic in Chembur. Here are 5 evidence-based rehabilitation exercises...</p>',
    excerpt: 'Learn effective physiotherapy exercises to alleviate chronic lower back pain and strengthen your core.',
    featuredImage: '/images/blog/back-pain-exercises.jpg',
    status: 'published',
    category: 'Spine & Back Rehab',
    tags: ['Back Pain', 'Physiotherapy', 'Rehab'],
    seoTitle: '5 Lower Back Pain Relief Exercises | Shreyaan Physiotherapy',
    seoDescription: 'Discover doctor-recommended exercises to cure lower back pain without surgery.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'blog-2',
    title: 'Ergonomic Desk Setup to Prevent Neck & Shoulder Pain',
    slug: 'ergonomic-desk-setup-neck-pain',
    content: '<p>With remote work and extended screen hours, cervical strain and neck pain have quadrupled. Optimize your workspace with our ergonomic checklist...</p>',
    excerpt: 'Simple workspace adjustments to prevent posture-related neck strain and tension headaches.',
    featuredImage: '/images/blog/ergonomic-desk.jpg',
    status: 'published',
    category: 'Ergonomics',
    tags: ['Posture', 'Neck Pain', 'Ergonomics'],
    seoTitle: 'Ergonomic Desk Setup for Neck Pain Relief | Chembur Clinic',
    seoDescription: 'Prevent cervical spine strain with clinical ergonomic recommendations.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const isDemoEnabled = () =>
  process.env.NODE_ENV !== 'production' &&
  (process.env.ENABLE_DEMO_BLOGS === 'true' || process.env.ALLOW_DEMO_DATA === 'true');

// @desc    Get All Blogs (Supports status, search, category, tag query filters)
// @route   GET /api/blog
// @access  Public
const getBlogs = async (req, res, next) => {
  try {
    const { status, category, tag, search } = req.query;

    try {
      const query = {};
      if (status) query.status = status;
      if (category) query.category = category;
      if (tag) query.tags = tag;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }

      const blogs = await Blog.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: blogs.length,
        blogs,
      });
    } catch {
      if (!isDemoEnabled()) {
        return res.status(200).json({
          success: true,
          count: 0,
          blogs: [],
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(200).json({
        success: true,
        count: 0,
        blogs: [],
      });
    }

    // Filter memory store (local dev only if explicitly enabled)
    let filtered = [...inMemoryBlogs];
    if (status) filtered = filtered.filter((b) => b.status === status);
    if (category) filtered = filtered.filter((b) => b.category === category);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      blogs: filtered,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Blog by Slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    try {
      const blog = await Blog.findOne({ slug });
      if (blog) {
        return res.status(200).json({
          success: true,
          blog,
        });
      }
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: `Blog with slug '${slug}' not found.`,
        });
      }
    } catch {
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: `Blog with slug '${slug}' not found.`,
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(404).json({
        success: false,
        message: `Blog with slug '${slug}' not found.`,
      });
    }

    const blog = inMemoryBlogs.find((b) => b.slug === slug || b._id === slug);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with slug '${slug}' not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Blog Post (Doctor Protected) - Cloudinary Storage Supported
// @route   POST /api/blog
// @access  Protected
const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    const generatedSlug = slugify(title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    
    // Save Cloudinary secure HTTPS URL from req.file if uploaded, otherwise body URL or fallback
    const imagePath = req.file
      ? (req.file.path || req.file.secure_url)
      : (req.body.featuredImage || '/images/blog/default.jpg');

    let newBlog;

    try {
      newBlog = await Blog.create({
        title,
        slug: generatedSlug,
        content,
        excerpt: excerpt || title,
        category: category || 'Physiotherapy',
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t) => t.trim()) : []),
        status: status || 'published',
        featuredImage: imagePath,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || title,
        author: req.user?.id,
      });

      return res.status(201).json({
        success: true,
        message: 'Blog post created successfully in database.',
        blog: newBlog,
      });
    } catch (dbError) {
      if (!isDemoEnabled()) {
        return next(dbError);
      }

      // Fallback Memory Creation
      newBlog = {
        _id: `blog-${Date.now()}`,
        title,
        slug: generatedSlug,
        content,
        excerpt: excerpt || title,
        category: category || 'Physiotherapy',
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t) => t.trim()) : []),
        status: status || 'published',
        featuredImage: imagePath,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      inMemoryBlogs.unshift(newBlog);

      return res.status(201).json({
        success: true,
        message: 'Blog post created successfully.',
        blog: newBlog,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update Blog Post (Doctor Protected) - Cloudinary Storage Supported
// @route   PUT /api/blog/:id
// @access  Protected
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      updates.featuredImage = req.file.path || req.file.secure_url;
    }

    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    }

    try {
      const blog = await Blog.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (blog) {
        return res.status(200).json({
          success: true,
          message: 'Blog updated successfully.',
          blog,
        });
      }
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found.',
        });
      }
    } catch (dbError) {
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found.',
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    const index = inMemoryBlogs.findIndex((b) => b._id === id || b.slug === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    inMemoryBlogs[index] = {
      ...inMemoryBlogs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully.',
      blog: inMemoryBlogs[index],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Blog Post (Doctor Protected)
// @route   DELETE /api/blog/:id
// @access  Protected
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Blog.findByIdAndDelete(id);
      if (deleted) {
        return res.status(200).json({
          success: true,
          message: 'Blog deleted successfully.',
        });
      }
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found.',
        });
      }
    } catch (dbError) {
      if (!isDemoEnabled()) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found.',
        });
      }
    }

    if (!isDemoEnabled()) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    const initialLen = inMemoryBlogs.length;
    inMemoryBlogs = inMemoryBlogs.filter((b) => b._id !== id && b.slug !== id);

    if (inMemoryBlogs.length !== initialLen) {
      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully.',
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Blog not found.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
