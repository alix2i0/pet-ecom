const express = require("express");
const router = express.Router();
// const petCategoryController = require('../controllers/petCategoryController');
const petCategoryController = require("../controllers/petCategoryController");

// Routes for pet categories
router.get('/', petCategoryController.getCategories);
router.post('/', petCategoryController.addCategory);
router.get('/:category', petCategoryController.getCategoryByName);
router.put('/:category', petCategoryController.updateCategoryByName);
router.delete('/:category', petCategoryController.deleteCategoryByName);

module.exports = router;
