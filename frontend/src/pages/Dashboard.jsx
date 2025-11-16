import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import SweetCard from '../components/SweetCard'
import SearchFilter from '../components/SearchFilter'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Dashboard = () => {
  const [sweets, setSweets] = useState([])
  const [filteredSweets, setFilteredSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { getCartCount } = useCart()

  const fetchSweets = async () => {
    try {
      const { data } = await axios.get('/api/sweets')
      setSweets(data.data)
      setFilteredSweets(data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch sweets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  const handleSearch = async (filters) => {
    try {
      const params = new URLSearchParams()
      if (filters.name) params.append('name', filters.name)
      if (filters.category) params.append('category', filters.category)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)

      const { data } = await axios.get(`/api/sweets/search?${params}`)
      setFilteredSweets(data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Search failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filter Component - Slides from left */}
      <SearchFilter onSearch={handleSearch} />

      {/* Header */}
      <div className="text-center space-y-2 mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          {user?.role === 'admin' ? 'Product Catalog' : 'Sweet Collection'}
        </h1>
        <p className="text-gray-600 text-lg">
          {user?.role === 'admin' ? 'View all available products' : 'Discover and purchase your favorite treats'}
        </p>
      </div>

      {/* Products Section */}
      {filteredSweets.length === 0 ? (
        <div className="text-center py-20">
          <div className="glass rounded-3xl p-12 max-w-md mx-auto animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-semibold text-gray-600">No sweets found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Reset Search
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-bold text-purple-600">{filteredSweets.length}</span> {filteredSweets.length === 1 ? 'sweet' : 'sweets'}
            </p>
            {user?.role !== 'admin' && getCartCount() > 0 && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                {getCartCount()} item{getCartCount() > 1 ? 's' : ''} in cart
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard 
                key={sweet._id} 
                sweet={sweet} 
                isAdmin={false}
                onUpdate={fetchSweets}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
