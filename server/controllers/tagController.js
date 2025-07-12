const Tag = require('../models/Tag');

// @desc Get all tags
// @route GET /api/tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc Create a new tag (admin only)
// @route POST /api/tags
exports.createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const existing = await Tag.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Tag already exists' });

    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
