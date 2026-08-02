const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    excerpt: {
      type: String,
      trim: true,
    },
    featuredImage: {
      type: String,
      default: '/images/blog/default.jpg',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    category: {
      type: String,
      default: 'Physiotherapy',
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before validation
blogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
