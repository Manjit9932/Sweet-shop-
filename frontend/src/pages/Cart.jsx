import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Smartphone } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../utils/axios'
import toast from 'react-hot-toast'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [purchasing, setPurchasing] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [upiTransactionId, setUpiTransactionId] = useState('')
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return
    }

    if (paymentMethod === 'upi' && !upiTransactionId.trim()) {
      toast.error('Please enter UPI Transaction ID')
      return
    }

    setPurchasing(true)
    try {
      const orderItems = cartItems.map(item => ({
        sweetId: item._id,
        quantity: item.quantity
      }))

      await axios.post('/api/orders', { 
        items: orderItems,
        paymentMethod,
        upiTransactionId: paymentMethod === 'upi' ? upiTransactionId : null
      })
      
      toast.success(`🎉 Order placed with ${paymentMethod.toUpperCase()}! Waiting for admin approval...`)
      clearCart()
      setShowPaymentModal(false)
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
              onClick={() => setShowPaymentModal(true)}
              disabled={purchasing}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {purchasing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </span>
              ) : (
                `Proceed to Checkout (₹${getCartTotal().toFixed(2)})`
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>🔒 Secure Checkout</p>
              <p className="mt-1">Your information is protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>
            
            <div className="space-y-4 mb-6">
              {/* Cash on Delivery */}
              <button
                onClick={() => {
                  setPaymentMethod('cod')
                  setUpiTransactionId('')
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center space-x-4 ${
                  paymentMethod === 'cod'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  paymentMethod === 'cod' ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  <ShoppingBag className={`w-6 h-6 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-800">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">Pay when you receive</p>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>

              {/* UPI Payment */}
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center space-x-4 ${
                  paymentMethod === 'upi'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  paymentMethod === 'upi' ? 'bg-purple-500' : 'bg-gray-200'
                }`}>
                  <Smartphone className={`w-6 h-6 ${paymentMethod === 'upi' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-800">UPI Payment</p>
                  <p className="text-sm text-gray-600">Pay via UPI apps</p>
                </div>
                {paymentMethod === 'upi' && (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            {/* UPI Transaction ID Input */}
            {paymentMethod === 'upi' && (
              <div className="mb-6 bg-purple-50 p-4 rounded-xl">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  UPI Transaction ID
                </label>
                <input
                  type="text"
                  value={upiTransactionId}
                  onChange={(e) => setUpiTransactionId(e.target.value)}
                  placeholder="Enter UPI Transaction ID"
                  className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Pay via any UPI app and enter the transaction ID here
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-purple-600">₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                disabled={purchasing}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={purchasing || (paymentMethod === 'upi' && !upiTransactionId.trim())}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {purchasing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
