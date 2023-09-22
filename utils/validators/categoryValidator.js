
const {check} = require('express-validator');
const {validatorMiddleWare} = require('../../middleWares/validatorMiddleWare')

exports.getCategoryValidator=
[
  check('id').isMongoId().withMessage('not valid category id'),
  validatorMiddleWare,
];

exports.creatCategoryValidator=
[
  check('name')
  .isString().withMessage("Category name should be string")
  .notEmpty().withMessage("Category required")
  .isLength({min:3}).withMessage("Too short caregory name")
  .isLength({max:32}).withMessage("Too long category name"),
  validatorMiddleWare, 
]

exports.updateCategoryValidator=
[
  check('id').isMongoId().withMessage('not valid category id'),
  validatorMiddleWare,
  check('name')
  .isString().withMessage("Category name should be string")
  .notEmpty().withMessage("Category required")
  .isLength({min:3}).withMessage("Too short caregory name")
  .isLength({max:32}).withMessage("Too long category name"),
  validatorMiddleWare, 
]

exports.deleteCategoryValidator=
[
  check('id').isMongoId().withMessage('not valid category id'),
  validatorMiddleWare,
];





