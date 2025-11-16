# 🍬 Sweet Shop Management System

A full-stack e-commerce application for managing a sweet shop with comprehensive features including user authentication, shopping cart, order management with admin approval system, and real-time notifications.

[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Beautiful landing page with animated gradients and feature highlights*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Product catalog with advanced filtering and search functionality*

### Shopping Cart
![Cart](screenshots/cart.png)
*Intuitive cart management with payment method selection*

### Admin Panel
![Admin](screenshots/admin.png)
*Comprehensive admin dashboard for inventory management*

### Order Management
![Orders](screenshots/orders.png)
*Order approval system with customer details and notifications*

## ✨ Key Features

### User Features
- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control
- 🛒 **Smart Shopping Cart** - Persistent cart with real-time updates and visual indicators
- 🔍 **Advanced Search** - Filter by name, category, and price range with dynamic results
- 📦 **Order Tracking** - Real-time order status with detailed history
- 👤 **Profile Management** - Update personal details and delivery address
- 💳 **Multiple Payment Options** - Cash on Delivery and UPI payment support
- 📱 **Responsive Design** - Seamless experience across all devices

### Admin Features
- 👨‍💼 **Admin Dashboard** - Centralized control panel
- ➕ **Product Management** - Add, edit, and delete products with ease
- 📊 **Inventory Control** - Real-time stock updates and restock functionality
- ✅ **Order Approval System** - Review and approve/reject customer orders
- 🔔 **Real-time Notifications** - Instant alerts for new orders
- 📍 **Customer Information** - Access to customer details and delivery addresses
- 📈 **Order Analytics** - Track pending, approved, and rejected orders

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server and API framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security
- **Mongoose** - MongoDB object modeling

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### Development Tools
- **Nodemon** - Auto-restart for development
- **Jest** - Testing framework
- **Git** - Version control

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/sweet-shop-management.git
cd sweet-shop-management
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory:
```env
PORT=5001
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sweet-shop?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

**Note:** Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your MongoDB Atlas credentials.

4. **MongoDB Atlas Setup**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Go to "Database Access" → Create a database user
   - Go to "Network Access" → Add your IP address (or allow from anywhere for development)
   - Copy the connection string and update `.env`

5. **Create Admin User**
```bash
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@sweetshop.com`
- Password: `admin123`

6. **Start Backend Server**
```bash
npm run dev
```

Server will run on: `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Start Frontend Development Server**
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 🧪 Testing

### Run Backend Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Test Results

