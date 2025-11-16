import { ShoppingCart, Edit, Trash2, Package, Plus, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from '../utils/axios'
import toast from 'react-hot-toast'

const SweetCard = ({ sweet, isAdmin, onUpdate, onDelete }) => {
  const [purchasing, setPurchasing] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, cartItems } = useCart()
  const { user } = useAuth()
  const [isInCart, setIsInCart] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  useEffect(() => {
    // Check if item is in cart
    const cartItem = cartItems.find(item => item._id === sweet._id)
    if (cartItem) {
      setIsInCart(true)
      setCartQuantity(cartItem.quantity)
    } else {
      setIsInCart(false)
      setCartQuantity(0)
    }
  }, [cartItems, sweet._id])

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: 'from-amber-400 to-orange-500',
      candy: 'from-pink-400 to-rose-500',
      gummy: 'from-green-400 to-emerald-500',
      'hard-candy': 'from-blue-400 to-cyan-500',
      lollipop: 'from-purple-400 to-pink-500',
      other: 'from-gray-400 to-slate-500'
    }
    return colors[category] || colors.other
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      chocolate: '🍫',
      candy: '🍬',
      gummy: '🍡',
      'hard-candy': '🍭',
      lollipop: '🍭',
      other: '🍰'
    }
    return emojis[category] || '🍬'
  }

  const handleAddToCart = () => {
    addToCart(sweet, quantity)
    setQuantity(1)
  }

  const handleBuyNow = async () => {
    setPurchasing(true)
    try {
      await axios.post(`/api/sweets/${sweet._id}/purchase`, { quantity })
      toast.success(`Purchased ${quantity} ${sweet.name}!`)
      onUpdate && onUpdate()
      setQuantity(1)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="glass rounded-2xl overflow-hidden card-hover group relative">
      {/* In Cart Badge */}
      {isInCart && !isAdmin && (
        <div className="absolute top-2 left-2 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
          <Check className="w-3 h-3" />
          <span>In Cart ({cartQuantity})</span>
        </div>
      )}

      <div className={`h-48 bg-gradient-to-br ${getCategoryColor(sweet.category)} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
        
        {/* Emoji Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl drop-shadow-2xl opacity-90 group-hover:scale-110 transition-transform">
            {getCategoryEmoji(sweet.category)}
          </span>
        </div>

        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-lg">
          ₹{sweet.price.toFixed(2)}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{sweet.name}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
            {sweet.category}
          </span>
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className={`font-semibold ${sweet.quantity === 0 ? 'text-red-500' : 'text-green-600'}`}>
              {sweet.quantity} in stock
            </span>
          </div>
        </div>

        {sweet.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{sweet.description}</p>
        )}

        {/* Only show quantity selector for non-admin users */}
        {!isAdmin && user?.role !== 'admin' && sweet.quantity > 0 && (
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <label className="text-sm font-medium text-gray-700">Qty:</label>
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), sweet.quantity))}
              className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          {!isAdmin ? (
            <>
              <button
                onClick={handleAddToCart}
                disabled={sweet.quantity === 0}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  sweet.quantity === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isInCart
                    ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:scale-105'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isInCart ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{isInCart ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={sweet.quantity === 0 || purchasing}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  sweet.quantity === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{sweet.quantity === 0 ? 'Out of Stock' : purchasing ? 'Buying...' : 'Buy Now'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onUpdate(sweet)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
              >
                <Edit className="w-5 h-5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(sweet._id)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SweetCard
