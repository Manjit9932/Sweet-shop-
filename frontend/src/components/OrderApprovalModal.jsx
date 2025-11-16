import { CheckCircle, X, User, Mail, Package, IndianRupee, MapPin, Phone } from 'lucide-react'

const OrderApprovalModal = ({ isOpen, onClose, onConfirm, order, isProcessing }) => {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full animate-slide-up shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
            disabled={isProcessing}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <div className="bg-white p-3 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">
              Approve Order
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Customer Details */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-purple-600" />
              <span>Customer Details</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-semibold text-gray-800 flex items-center space-x-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>{order.user?.name}</span>
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-semibold text-gray-800 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="truncate">{order.user?.email}</span>
                </p>
              </div>
            </div>

            {/* Phone Number */}
            {order.user?.phone && (
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="font-semibold text-gray-800 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span>{order.user?.phone}</span>
                </p>
              </div>
            )}

            {/* Delivery Address */}
            {order.user?.address && (order.user.address.street || order.user.address.city) && (
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2 flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">Delivery Address</span>
                </p>
                <div className="ml-6 text-gray-800 space-y-1">
                  {order.user.address.street && (
                    <p className="font-medium">{order.user.address.street}</p>
                  )}
                  {(order.user.address.city || order.user.address.state) && (
                    <p>
                      {order.user.address.city}
                      {order.user.address.city && order.user.address.state && ', '}
                      {order.user.address.state}
                    </p>
                  )}
                  {order.user.address.pincode && (
                    <p className="font-semibold">PIN: {order.user.address.pincode}</p>
                  )}
                  {order.user.address.country && (
                    <p className="text-sm text-gray-600">{order.user.address.country}</p>
                  )}
                </div>
              </div>
            )}

            {/* No Address Warning */}
            {(!order.user?.address || (!order.user.address.street && !order.user.address.city)) && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> Customer has not provided a delivery address yet.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="font-mono text-sm text-gray-700">{order._id}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
              <Package className="w-5 h-5 text-purple-600" />
              <span>Order Items</span>
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                      <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-6 h-6 text-green-600" />
                <span className="text-xl font-bold text-gray-800">Total Amount</span>
              </div>
              <span className="text-3xl font-bold text-green-600">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Confirm Approval:</strong> By approving this order, the stock will be automatically deducted from your inventory. This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Approving...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Approve Order</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderApprovalModal
