import { AlertTriangle, X } from 'lucide-react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, itemName, isDeleting }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-t-3xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
            disabled={isDeleting}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <div className="bg-white p-3 rounded-full animate-pulse">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">
              {title || 'Confirm Deletion'}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <p className="text-gray-700 text-lg">
              {message || 'Are you sure you want to delete this item?'}
            </p>
            
            {itemName && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Item to delete:</p>
                <p className="text-xl font-bold text-red-600">"{itemName}"</p>
              </div>
            )}

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-800 text-left">
                  <strong>Warning:</strong> This action cannot be undone. The item will be permanently removed from your inventory.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isDeleting ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </span>
              ) : (
                'Yes, Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
