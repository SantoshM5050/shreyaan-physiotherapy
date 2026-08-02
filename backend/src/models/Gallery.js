const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    category: {
      type: String,
      enum: ['Clinic', 'Treatment', 'Equipment'],
      default: 'Clinic',
      required: true,
    },
    publicId: {
      type: String,
      default: '',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
