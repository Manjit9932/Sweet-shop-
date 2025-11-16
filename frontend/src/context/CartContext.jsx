import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (sweet, quantity = 1) => {
    const existingItem = cartItems.find(item => item._id === sweet._id)
    
    if (existingItem) {
      // Check if adding more would exceed stock
      if (existingItem.quantity + quantity > sweet.quantity) {
        toast.error('Cannot add more than available stock')
        return
      }
      
      setCartItems(cartItems.map(item =>
        item._id === sweet._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
      toast.success(`Updated ${sweet.name} quantity in cart`)
    } else {
      if (quantity > sweet.quantity) {
        toast.error('Cannot add more than available stock')
        return
      }
      
      setCartItems([...cartItems, { ...sweet, quantity }])
      toast.success(`${sweet.name} added to cart!`)
    }
  }

  const removeFromCart = (sweetId) => {
    setCartItems(cartItems.filter(item => item._id !== sweetId))
    toast.success('Item removed from cart')
  }

  const updateQuantity = (sweetId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(sweetId)
      return
    }

    const item = cartItems.find(item => item._id === sweetId)
    if (item && quantity > item.quantity) {
      toast.error('Cannot add more than available stock')
      return
    }

    setCartItems(cartItems.map(item =>
      item._id === sweetId ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
