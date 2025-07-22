const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/events
// @desc    Create an event
// @access  Private
router.post('/', auth, async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    images,
    category,
  } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      images,
      category,
      organizer: req.user.id,
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/events/unapproved
// @desc    Get all unapproved events
// @access  Private/Admin
router.get('/unapproved', [auth, admin], async (req, res) => {
  try {
    const events = await Event.find({ isApproved: false }).populate('category', ['name']);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isApproved: true }).populate('category', ['name']);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/events/featured
// @desc    Get featured events
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const events = await Event.find({ isApproved: true, isFeatured: true }).populate('category', ['name']);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/events/approve/:id
// @desc    Approve an event
// @access  Private/Admin
router.put('/approve/:id', [auth, admin], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    event.isApproved = true;
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
