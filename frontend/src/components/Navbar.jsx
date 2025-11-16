import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import { Candy, LogOut, User, Shield, Home, LayoutDashboard, ShoppingCart, Package } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const location = useLocation()
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPendingOrders()
      // Poll every 30 seconds for new orders
      const interval = setInterval(fetchPendingOrders, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchPendingOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/all')
      const pending = data.data.filter(order => order.status === 'pending')
      setPendingOrdersCount(pending.length)
    } catch (error) {
      console.error('Failed to fetch pending orders')
    }
  }

  return (
    <nav className="glass sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Candy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Sweet Shop
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/login" 
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                
                {/* Cart Icon - Only for regular users */}
                {user.role !== 'admin' && (
                  <>
                    <Link to="/cart" className={`nav-link relative ${isActive('/cart') ? 'active' : ''}`}>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Cart</span>
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                          {getCartCount()}
                        </span>
                      )}
                    </Link>

                    <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`}>
                      <Package className="w-4 h-4" />
                      <span>Orders</span>
                    </Link>
                  </>
                )}

                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                    <Link to="/admin/orders" className={`nav-link relative ${isActive('/admin/orders') ? 'active' : ''}`}>
                      <Package className="w-4 h-4" />
                      <span>Manage Orders</span>
                      {pendingOrdersCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                          {pendingOrdersCount}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-3 px-4 py-2 bg-white rounded-full shadow-md">
                  <Link to="/profile" className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </Link>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
