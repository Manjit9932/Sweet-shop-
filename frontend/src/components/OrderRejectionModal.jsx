import { XCircle, X, User, Mail, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

const OrderRejectionModal = ({ isOpen, onClose, onConfirm, order, isProcessing }) => {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  if (!isOpen || !order) return null

  const predefinedReasons = [
    'Out of stock',
    'Payment verification failed',
    'Delivery area not serviceable',
    'Customer request',
    'Suspicious order',
    'Price mismatch',
    'Other'
  ]

  const handleReasonSelect = (selectedReason) => {
    setReason(selectedReason)
    setError('')
  }

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('Please select or enter a rejection reason')
      return
    }
    onConfirm(reason)
    setReason('')
    setError('')
  }

  const handleClose = () => {
    setReason('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full animate-slide-up shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-t-3xl p-6 relative">
          <button
            onClick={handleClose}
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
              Reject Order
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Customer Details */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-red-600" />
              <span>Customer Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-semibold text-gray-800 flex items-center space-x-2">
                  <User className="w-4 h-4 text-red-600" />
                  <span>{order.user?.name}</span>
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-semibold text-gray-800 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span className="truncate">{order.user?.email}</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="font-mono text-sm text-gray-700">{order._id}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="font-bold text-xl text-red-600">₹{order.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Predefined Reasons */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800">Select Rejection Reason</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {predefinedReasons.map((preReason, index) => (
                <button
                  key={index}
                  onClick={() => handleReasonSelect(preReason)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    reason === preReason
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preReason}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Reason Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Or Enter Custom Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setError('')
              }}
              placeholder="Explain why you're rejecting this order..."
              rows="4"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {error && (
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> The customer will be notified about this rejection. Please provide a clear and professional reason.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Rejecting...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <XCircle className="w-5 h-5" />
                  <span>Reject Order</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderRejectionModal
