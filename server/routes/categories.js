const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/categories
// @desc    Create a category
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({
      name,
    });

    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
