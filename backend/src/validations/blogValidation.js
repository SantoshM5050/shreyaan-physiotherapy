const { body, validationResult } = require('express-validator');

const validateBlog = [
  body('title').notEmpty().withMessage('Blog title is required').trim(),
  body('content').notEmpty().withMessage('Blog content is required'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),
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

module.exports = { validateBlog };
