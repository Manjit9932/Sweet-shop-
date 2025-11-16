const Sweet = require('../models/Sweet');

// @desc    Purchase sweet
// @route   POST /api/sweets/:id/purchase
// @access  Private
exports.purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid quantity'
      });
    }
    
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }
    
    sweet.quantity -= quantity;
    await sweet.save();
    
    res.status(200).json({
      success: true,
      message: 'Purchase successful',
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Restock sweet
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
exports.restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid quantity'
      });
    }
    
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    sweet.quantity += quantity;
    await sweet.save();
    
    res.status(200).json({
      success: true,
      message: 'Restock successful',
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
