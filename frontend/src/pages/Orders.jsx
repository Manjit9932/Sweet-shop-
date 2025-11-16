import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import { Package, Clock, CheckCircle, XCircle, Trash2, ShoppingBag, Smartphone } from 'lucide-react'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders')
      setOrders(data.data)
    } catch (error) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return

    try {
      await axios.delete(`/api/orders/${orderId}`)
      toast.success('Order cancelled successfully')
      fetchOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
      completed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle }
    }
    
    // Default badge if status is not found
    const badge = badges[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: Package }
    const Icon = badge.icon

    return (
      <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        <span className="capitalize">{status}</span>
      </span>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="glass rounded-3xl p-12 text-center space-y-6 max-w-md mx-auto">
          <Package className="w-24 h-24 text-purple-600 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800">No Orders Yet</h2>
          <p className="text-gray-600">Start shopping to place your first order!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-gray-600">Track your order status</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(order.status)}
                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Cancel Order"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {order.rejectionReason && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700">
                  <strong>Rejection Reason:</strong> {order.rejectionReason}
                </p>
              </div>
            )}

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">Payment Method:</p>
              <div className="flex items-center space-x-2">
                {order.paymentMethod === 'cod' ? (
                  <>
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">Cash on Delivery</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-600">UPI Payment</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-purple-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-purple-600">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
