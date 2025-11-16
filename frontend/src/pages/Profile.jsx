import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/AuthContext'
import CancelOrderModal from '../components/CancelOrderModal'
import { User, Mail, Phone, MapPin, Edit2, Save, X, Package, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  })
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/users/profile')
      setProfile(data.data)
      setFormData({
        name: data.data.name || '',
        phone: data.data.phone || '',
        address: {
          street: data.data.address?.street || '',
          city: data.data.address?.city || '',
          state: data.data.address?.state || '',
          pincode: data.data.address?.pincode || '',
          country: data.data.address?.country || 'India'
        }
      })
    } catch (error) {
      toast.error('Failed to fetch profile')
    }
  }

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
    fetchProfile()
    fetchOrders()
  }, [])

  const handleUpdate = async () => {
    try {
      await axios.put('/api/users/profile', formData)
      toast.success('Profile updated successfully!')
      setIsEditing(false)
      fetchProfile()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    }
  }

  const handleCancelClick = (order) => {
    setSelectedOrder(order)
    setShowCancelModal(true)
  }

  const handleCancelConfirm = async () => {
    if (!selectedOrder) return

    setIsCancelling(true)
    try {
      await axios.delete(`/api/orders/${selectedOrder._id}`)
      toast.success('Order cancelled successfully! 🗑️')
      setShowCancelModal(false)
      setSelectedOrder(null)
      fetchOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order')
    } finally {
      setIsCancelling(false)
    }
  }

  const handleCancelClose = () => {
    setShowCancelModal(false)
    setSelectedOrder(null)
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle }
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-gray-600">Manage your account and view order history</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      fetchProfile()
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <User className="w-5 h-5 text-purple-600" />
                    <span>{profile?.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="flex items-center space-x-2 text-gray-800">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>{profile?.email}</span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <span>{profile?.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>Address</span>
                </label>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={formData.address.street}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value }})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value }})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value }})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={formData.address.pincode}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value }})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                    {profile?.address?.street ? (
                      <>
                        <p>{profile.address.street}</p>
                        <p>{profile.address.city}, {profile.address.state}</p>
                        <p>{profile.address.pincode}, {profile.address.country}</p>
                      </>
                    ) : (
                      <p className="text-gray-400">No address added</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <Package className="w-6 h-6 text-purple-600" />
              <span>Order History</span>
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(order.status)}
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleCancelClick(order)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                            title="Cancel Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {order.rejectionReason && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                        <p className="text-sm text-red-700">
                          <strong>Rejection Reason:</strong> {order.rejectionReason}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.name} x {item.quantity}</span>
                          <span className="font-semibold text-purple-600">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-purple-600">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={handleCancelClose}
        onConfirm={handleCancelConfirm}
        order={selectedOrder}
        isProcessing={isCancelling}
      />
    </div>
  )
}

export default Profile
