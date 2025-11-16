import { Search, X, RotateCcw, Filter, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  })
  const [isOpen, setIsOpen] = useState(false)

  const categories = ['chocolate', 'candy', 'gummy', 'hard-candy', 'lollipop', 'other']

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onSearch(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = { name: '', category: '', minPrice: '', maxPrice: '' }
    setFilters(emptyFilters)
    onSearch(emptyFilters)
  }

  const hasActiveFilters = filters.name || filters.category || filters.minPrice || filters.maxPrice

  return (
    <>
      {/* Filter Toggle Button - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 px-3 py-4 rounded-r-2xl font-semibold transition-all flex flex-col items-center space-y-2 shadow-lg ${
          isOpen
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl'
        }`}
      >
        {isOpen ? (
          <>
            <ChevronLeft className="w-6 h-6" />
            <span className="text-xs font-bold">Close</span>
          </>
        ) : (
          <>
            <Filter className="w-6 h-6" />
            <span className="text-xs font-bold">Filter</span>
            {hasActiveFilters && (
              <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {[filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length}
              </span>
            )}
          </>
        )}
      </button>

      {/* Filter Sidebar - Slides in from left */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-30 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6 mt-16">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Search by Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sweets..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {filters.name && (
                <button
                  onClick={() => handleFilterChange('name', '')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <div className="space-y-2">
              <button
                onClick={() => handleFilterChange('category', '')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  filters.category === ''
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange('category', cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all capitalize ${
                    filters.category === cat
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (₹)</label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="₹0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="₹1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-gray-600 mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <span className="capitalize">{filters.category.replace('-', ' ')}</span>
                    <button onClick={() => handleFilterChange('category', '')} className="hover:bg-purple-200 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.minPrice && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <span>Min: ₹{filters.minPrice}</span>
                    <button onClick={() => handleFilterChange('minPrice', '')} className="hover:bg-green-200 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.maxPrice && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <span>Max: ₹{filters.maxPrice}</span>
                    <button onClick={() => handleFilterChange('maxPrice', '')} className="hover:bg-blue-200 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay - Closes sidebar when clicked */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-20 backdrop-blur-sm"
        ></div>
      )}
    </>
  )
}

export default SearchFilter
