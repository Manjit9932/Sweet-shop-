import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import OrderApprovalModal from '../components/OrderApprovalModal'
import OrderRejectionModal from '../components/OrderRejectionModal'
import { Package, CheckCircle, XCircle, Clock, User, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { requestNotificationPermission, notifyNewOrder } from '../utils/notifications'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [newOrdersCount, setNewOrdersCount] = useState(0)
  const [previousOrderIds, setPreviousOrderIds] = useState([])

  useEffect(() => {
    // Request notification permission on mount
    requestNotificationPermission()
    fetchOrders()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/all')
      
      // Check for new pending orders
      if (previousOrderIds.length > 0) {
        const newPendingOrders = data.data.filter(order => 
          order.status === 'pending' && 
          !previousOrderIds.includes(order._id)
        )
        
        if (newPendingOrders.length > 0) {
          toast.success(`${newPendingOrders.length} new order(s) received! 🔔`, {
            duration: 5000,
            icon: '🎉'
          })
          
          // Browser notification for each new order
          newPendingOrders.forEach(order => {
            notifyNewOrder(
              order._id.slice(-6),
              order.user?.name || 'Customer',
              order.totalAmount.toFixed(2)
            )
          })
        }
      }
      
      // Update previous order IDs
      setPreviousOrderIds(data.data.map(order => order._id))
      setOrders(data.data)
    } catch (error) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveClick = (order) => {
    setSelectedOrder(order)
    setShowApprovalModal(true)
  }

  const handleApproveConfirm = async () => {
    if (!selectedOrder) return
    
    setIsProcessing(true)
    try {
      await axios.put(`/api/orders/${selectedOrder._id}/approve`)
      toast.success('Order approved successfully! ✅')
      setShowApprovalModal(false)
      setSelectedOrder(null)
      fetchOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve order')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleApproveCancel = () => {
    setShowApprovalModal(false)
    setSelectedOrder(null)
  }

  const handleRejectClick = (order) => {
    setSelectedOrder(order)
    setShowRejectionModal(true)
  }

  const handleRejectConfirm = async (reason) => {
    if (!selectedOrder) return

    setIsProcessing(true)
    try {
      await axios.put(`/api/orders/${selectedOrder._id}/reject`, { reason })
      toast.success('Order rejected')
      setShowRejectionModal(false)
      setSelectedOrder(null)
      fetchOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject order')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRejectCancel = () => {
    setShowRejectionModal(false)
    setSelectedOrder(null)
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Order Management
          </h1>
          <p className="text-gray-600 mt-2">Approve or reject customer orders</p>
        </div>
        
        {/* Refresh Button */}
        <button
          onClick={() => {
            setLoading(true)
            fetchOrders()
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* New Orders Alert */}
      {getStatusCount('pending') > 0 && (
        <div className="glass rounded-2xl p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">
                {getStatusCount('pending')} Pending Order{getStatusCount('pending') > 1 ? 's' : ''} Awaiting Approval
              </p>
              <p className="text-sm text-gray-600">Please review and take action</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize whitespace-nowrap ${
              filter === status
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status} {status !== 'all' && `(${getStatusCount(status)})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No {filter !== 'all' ? filter : ''} orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="glass rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <p className="font-bold text-lg">{order.user?.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{order.user?.email}</p>
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
                  {order.status === 'pending' && (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>Pending</span>
                    </span>
                  )}
                  {order.status === 'approved' && (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approved</span>
                    </span>
                  )}
                  {order.status === 'rejected' && (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      <XCircle className="w-4 h-4" />
                      <span>Rejected</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl p-4 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <p className="font-bold text-purple-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {order.rejectionReason && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-sm text-red-700">
                    <strong>Rejection Reason:</strong> {order.rejectionReason}
                  </p>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total: ₹{order.totalAmount.toFixed(2)}</span>
                
                {order.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApproveClick(order)}
                      className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleRejectClick(order)}
                      className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approval Confirmation Modal */}
      <OrderApprovalModal
        isOpen={showApprovalModal}
        onClose={handleApproveCancel}
        onConfirm={handleApproveConfirm}
        order={selectedOrder}
        isProcessing={isProcessing}
      />

      {/* Rejection Modal */}
      <OrderRejectionModal
        isOpen={showRejectionModal}
        onClose={handleRejectCancel}
        onConfirm={handleRejectConfirm}
        order={selectedOrder}
        isProcessing={isProcessing}
      />
    </div>
  )
}

export default AdminOrders
