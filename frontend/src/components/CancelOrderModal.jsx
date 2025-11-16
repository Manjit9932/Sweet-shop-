import { XCircle, X, AlertTriangle, Package } from 'lucide-react'

const CancelOrderModal = ({ isOpen, onClose, onConfirm, order, isProcessing }) => {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-t-3xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
            disabled={isProcessing}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <div className="bg-white p-3 rounded-full animate-pulse">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">
              Cancel Order?
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Order Details */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="w-5 h-5 text-red-600" />
              <p className="font-bold text-gray-800">Order Details</p>
            </div>
            
            <div className="space-y-1 text-sm">
              <p className="text-gray-600">
                Order ID: <span className="font-mono text-gray-800">{order._id}</span>
              </p>
              <p className="text-gray-600">
                Items: <span className="font-semibold text-gray-800">{order.items.length}</span>
              </p>
              <p className="text-gray-600">
                Total: <span className="font-bold text-red-600 text-lg">₹{order.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Payment: <span className="font-semibold text-gray-800 capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}</span>
              </p>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto">
            <p className="text-sm font-semibold text-gray-700 mb-2">Items in this order:</p>
            <div className="space-y-2">
              {order.items.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} x {item.quantity}</span>
                  <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {order.items.length > 3 && (
                <p className="text-xs text-gray-500 italic">+{order.items.length - 3} more items</p>
              )}
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Are you sure?</strong> This will permanently cancel your order. This action cannot be undone.
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Status: Pending (You can only cancel pending orders)
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Do you want to proceed with cancellation?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              No, Keep Order
            </button>
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cancelling...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <XCircle className="w-5 h-5" />
                  <span>Yes, Cancel Order</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelOrderModal
