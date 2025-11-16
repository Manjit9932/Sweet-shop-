import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import AdminOrders from './pages/AdminOrders'
import Profile from './pages/Profile'

function App() {
  const { user } = useAuth()

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cart" 
            element={user && user.role !== 'admin' ? <Cart /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/orders" 
            element={user && user.role !== 'admin' ? <Orders /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin" 
            element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/admin/orders" 
            element={user?.role === 'admin' ? <AdminOrders /> : <Navigate to="/dashboard" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
