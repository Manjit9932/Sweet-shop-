const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  approveOrder,
  rejectOrder,
  cancelOrder
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/all', protect, adminOnly, getAllOrders);
router.put('/:id/approve', protect, adminOnly, approveOrder);
router.put('/:id/reject', protect, adminOnly, rejectOrder);
router.delete('/:id', protect, cancelOrder);

module.exports = router;
