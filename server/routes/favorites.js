const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Template = require('../models/Template');
const auth = require('../middleware/auth');

router.post('/:templateId', auth, async (req, res) => {
  try {
    const { templateId } = req.params;
    const userId = req.user.id; 

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const existing = await Favorite.findOne({ user_id: userId, template_id: templateId });
    
    if (existing) {
      await Favorite.findOneAndDelete({ user_id: userId, template_id: templateId });
      return res.json({ message: 'Removed from favorites', favorited: false });
    } else {
      await Favorite.create({ user_id: userId, template_id: templateId });
      return res.json({ message: 'Added to favorites', favorited: true });
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Template not found' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.find({ user_id: userId }).populate('template_id');
    
    const templates = favorites.map(fav => fav.template_id);
    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
