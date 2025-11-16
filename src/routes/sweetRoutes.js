const express = require('express');
const router = express.Router();
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} = require('../controllers/sweetController');
const {
  purchaseSweet,
  restockSweet
} = require('../controllers/inventoryController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, addSweet);
router.get('/', protect, getAllSweets);
router.get('/search', protect, searchSweets);
router.put('/:id', protect, updateSweet);
router.delete('/:id', protect, adminOnly, deleteSweet);

router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, adminOnly, restockSweet);

module.exports = router;
