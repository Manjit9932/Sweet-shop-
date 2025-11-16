# 🍬 Sweet Shop Management System

A full-stack e-commerce application for managing a sweet shop with cart functionality, order management, and admin approval system.

## ✨ Features

### User Features
- 🔐 User registration and authentication (JWT)
- 🛒 Shopping cart with persistent storage
- 🔍 Search and filter sweets by name, category, and price
- 📦 Order placement and tracking
- 👤 Profile management with address
- 📱 Responsive design

### Admin Features
- 👨‍💼 Admin dashboard
- ➕ Add, edit, delete sweets
- 📊 Inventory management (restock)
- ✅ Order approval/rejection system
- 🔔 Real-time order notifications
- 📍 View customer delivery addresses

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB Atlas (Cloud Database)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/sweet-shop-management.git
cd sweet-shop-management
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`)
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas credentials
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.jyrtj6j.mongodb.net/sweet-shop
JWT_SECRET=your_secret_key
```

5. Start backend server
```bash
npm run dev
```

Server runs on: http://localhost:5001

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start frontend
```bash
npm run dev
```

Frontend runs on: http://localhost:3000

### Create Admin User

```bash
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: admin@sweetshop.com
- Password: admin123

## 📁 Project Structure

