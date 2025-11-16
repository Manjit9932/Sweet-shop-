# Sweet Shop Management System - Backend

A robust RESTful API for managing a sweet shop with authentication, inventory management, and admin controls.

## Features

- ✅ JWT-based authentication
- ✅ Role-based access control (User/Admin)
- ✅ CRUD operations for sweets
- ✅ Search functionality (by name, category, price range)
- ✅ Inventory management (purchase & restock)
- ✅ Shopping cart functionality
- ✅ Comprehensive test coverage
- ✅ MVC architecture
- 💰 Prices in Indian Rupees (₹)

## Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Jest & Supertest for testing
- bcryptjs for password hashing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required variables

3. Start MongoDB service

4. Create admin user:
```bash
node scripts/createAdmin.js
```

5. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `POST /api/sweets` - Add new sweet
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `PUT /api/sweets/:id` - Update sweet
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Currency

All prices are in Indian Rupees (₹). Examples:
- Chocolate Bar: ₹50.00
- Candy Pack: ₹25.00
- Premium Sweets: ₹150.00

## Project Structure

