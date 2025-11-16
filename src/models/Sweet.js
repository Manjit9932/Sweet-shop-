const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a sweet name'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['chocolate', 'candy', 'gummy', 'hard-candy', 'lollipop', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },

  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for search functionality
sweetSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('Sweet', sweetSchema);
