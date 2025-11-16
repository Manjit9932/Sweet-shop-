const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  sweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sweet',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'upi'],
    required: true,
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  upiTransactionId: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  rejectionReason: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
