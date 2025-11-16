import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import SweetCard from '../components/SweetCard'
import ConfirmModal from '../components/ConfirmModal'
import { Plus, X, Package } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminPanel = () => {
  const [sweets, setSweets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingSweet, setEditingSweet] = useState(null)
  const [deletingSweet, setDeletingSweet] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'chocolate',
    price: '',
    quantity: '',
    description: ''
  })

  const categories = ['chocolate', 'candy', 'gummy', 'hard-candy', 'lollipop', 'other']

  const fetchSweets = async () => {
    try {
      const { data } = await axios.get('/api/sweets')
      setSweets(data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch sweets')
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingSweet) {
        await axios.put(`/api/sweets/${editingSweet._id}`, formData)
        toast.success('Sweet updated successfully')
      } else {
        await axios.post('/api/sweets', formData)
        toast.success('Sweet added successfully')
      }
      fetchSweets()
      handleCloseModal()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleDeleteClick = (sweet) => {
    setDeletingSweet(sweet)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingSweet) return
    
    setIsDeleting(true)
    try {
      await axios.delete(`/api/sweets/${deletingSweet._id}`)
      toast.success(`${deletingSweet.name} deleted successfully! 🗑️`)
      fetchSweets()
      setShowDeleteModal(false)
      setDeletingSweet(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete sweet')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeletingSweet(null)
  }

  const handleEdit = (sweet) => {
    setEditingSweet(sweet)
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      description: sweet.description || ''
    })
    setShowModal(true)
  }

  const handleRestock = async (sweetId) => {
    const quantity = prompt('Enter quantity to restock:')
    if (!quantity || isNaN(quantity) || quantity <= 0) return

    try {
      await axios.post(`/api/sweets/${sweetId}/restock`, { quantity: Number(quantity) })
      toast.success('Sweet restocked successfully')
      fetchSweets()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to restock')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSweet(null)
    setFormData({ name: '', category: 'chocolate', price: '', quantity: '', description: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">Manage your sweet inventory</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add Sweet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div key={sweet._id} className="relative">
            <SweetCard 
              sweet={sweet} 
              isAdmin={true}
              onUpdate={handleEdit}
              onDelete={() => handleDeleteClick(sweet)}
            />
            <button
              onClick={() => handleRestock(sweet._id)}
              className="absolute top-4 left-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-lg"
              title="Restock"
            >
              <Package className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 max-w-md w-full animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-200 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="99.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                {editingSweet ? 'Update Sweet' : 'Add Sweet'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Sweet Item?"
        message="Are you sure you want to permanently delete this sweet from your inventory?"
        itemName={deletingSweet?.name}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default AdminPanel
