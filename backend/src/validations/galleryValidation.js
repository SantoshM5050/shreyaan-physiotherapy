const { body, validationResult } = require('express-validator');

const validateGallery = [
  body('title').notEmpty().withMessage('Image title is required').trim(),
  body('category')
    .optional()
    .isIn(['Clinic', 'Treatment', 'Equipment'])
    .withMessage('Category must be Clinic, Treatment, or Equipment'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  },
];

module.exports = { validateGallery };
