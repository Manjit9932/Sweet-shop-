const Order = require('../models/Order');
const Sweet = require('../models/Sweet');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, upiTransactionId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    if (!paymentMethod || !['cod', 'upi'].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid payment method (COD or UPI)'
      });
    }

    if (paymentMethod === 'upi' && !upiTransactionId) {
      return res.status(400).json({
        success: false,
        message: 'UPI Transaction ID is required for UPI payment'
      });
    }

    // Validate stock availability
    for (let item of items) {
      const sweet = await Sweet.findById(item.sweetId);
      
      if (!sweet) {
        return res.status(404).json({
          success: false,
          message: `Sweet with ID ${item.sweetId} not found`
        });
      }

      if (sweet.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${sweet.name}`
        });
      }
    }

    // Prepare order items
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const sweet = await Sweet.findById(item.sweetId);
        return {
          sweet: sweet._id,
          name: sweet.name,
          category: sweet.category,
          price: sweet.price,
          quantity: item.quantity
        };
      })
    );

    // Calculate total
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      paymentMethod,
      upiTransactionId: paymentMethod === 'upi' ? upiTransactionId : null,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      status: 'pending'
    });

    await order.populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: `Order created successfully! Payment method: ${paymentMethod.toUpperCase()}. Waiting for admin approval.`,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('items.sweet');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/all
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort('-createdAt')
      .populate('user', 'name email phone address')
      .populate('items.sweet');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve order (Admin)
// @route   PUT /api/orders/:id/approve
// @access  Private/Admin
exports.approveOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.sweet');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Order is already ${order.status}`
      });
    }

    // Deduct stock for each item
    for (let item of order.items) {
      const sweet = await Sweet.findById(item.sweet);
      
      if (sweet.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${sweet.name}`
        });
      }

      sweet.quantity -= item.quantity;
      await sweet.save();
    }

    order.status = 'approved';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order approved successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject order (Admin)
// @route   PUT /api/orders/:id/reject
// @access  Private/Admin
exports.rejectOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Order is already ${order.status}`
      });
    }

    order.status = 'rejected';
    order.rejectionReason = reason || 'No reason provided';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order rejected',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order (User)
// @route   DELETE /api/orders/:id
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Can only cancel pending orders'
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
