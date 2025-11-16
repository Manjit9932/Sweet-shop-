import { XCircle, X, AlertTriangle, Package } from 'lucide-react'

const CancelOrderModal = ({ isOpen, onClose, onConfirm, order, isProcessing }) => {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-t-2xl p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-all"
            disabled={isProcessing}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <div className="bg-white p-2 rounded-full">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white text-center">
              Cancel Order?
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Order Details */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3 space-y-1.5">
            <div className="flex items-center space-x-1.5 mb-1">
              <Package className="w-4 h-4 text-red-600" />
              <p className="font-bold text-sm text-gray-800">Order Details</p>
            </div>
            
            <div className="space-y-0.5 text-xs">
              <p className="text-gray-600">
                Order ID: <span className="font-mono text-gray-800 text-[10px]">{order._id.slice(-8)}</span>
              </p>
              <p className="text-gray-600">
                Items: <span className="font-semibold text-gray-800">{order.items.length}</span>
              </p>
              <p className="text-gray-600">
                Total: <span className="font-bold text-red-600 text-base">₹{order.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Payment: <span className="font-semibold text-gray-800 capitalize">{order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'UPI'}</span>
              </p>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="bg-gray-50 rounded-lg p-3 max-h-28 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-700 mb-1.5">Items in this order:</p>
            <div className="space-y-1.5">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-gray-700 truncate flex-1">{item.name} x {item.quantity}</span>
                  <span className="font-semibold text-gray-800 ml-2">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="text-[10px] text-gray-500 italic">+{order.items.length - 2} more items</p>
              )}
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border-l-3 border-yellow-400 p-2.5 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 mr-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-yellow-800">
                  <strong>Are you sure?</strong> This will permanently cancel your order.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              No, Keep Order
            </button>
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-1.5">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cancelling...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Yes, Cancel</span>
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
