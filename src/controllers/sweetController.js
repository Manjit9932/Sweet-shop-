const Sweet = require('../models/Sweet');

// @desc    Add new sweet
// @route   POST /api/sweets
// @access  Private
exports.addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    
    res.status(201).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Private
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Private
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const sweets = await Sweet.find(query);
    
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update sweet
// @route   PUT /api/sweets/:id
// @access  Private
exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
