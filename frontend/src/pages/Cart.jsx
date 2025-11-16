import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../utils/axios'
import toast from 'react-hot-toast'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [purchasing, setPurchasing] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return
    }

    setPurchasing(true)
    try {
      // Create order instead of direct purchase
      const orderItems = cartItems.map(item => ({
        sweetId: item._id,
        quantity: item.quantity
      }))

      await axios.post('/api/orders', { items: orderItems })
      
      toast.success('🎉 Order placed! Waiting for admin approval...')
      clearCart()
      navigate('/orders')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order placement failed')
    } finally {
      setPurchasing(false)
    }
  }

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

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="glass rounded-3xl p-12 text-center space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="text-gray-600">Add some delicious sweets to get started!</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Shopping Cart ({cartItems.length} items)
              </h2>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-semibold text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className={`w-32 h-32 rounded-xl bg-gradient-to-br ${getCategoryColor(item.category)} flex-shrink-0 relative overflow-hidden shadow-lg`}>
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <span className="text-6xl drop-shadow-lg">{getCategoryEmoji(item.category)}</span>
                      <span className="text-white font-bold text-xs mt-2 px-2 py-1 bg-black bg-opacity-30 rounded-full backdrop-blur-sm capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Control */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-2 hover:bg-white rounded transition-all"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 hover:bg-white rounded transition-all"
                            disabled={item.quantity >= item.quantity}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                        <p className="text-xl font-bold text-purple-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (0%)</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">₹{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={purchasing}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {purchasing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </span>
              ) : (
                `Checkout (₹${getCartTotal().toFixed(2)})`
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>🔒 Secure Checkout</p>
              <p className="mt-1">Your information is protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
