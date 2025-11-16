const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

let token;
let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Create test user
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test User',
      email: 'user@test.com',
      password: 'password123'
    });
  token = userRes.body.token;
  
  // Create admin user
  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
  adminToken = adminRes.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});
  await mongoose.connection.close();
});

describe('Sweet API', () => {
  let sweetId;

  describe('POST /api/sweets', () => {
    it('should add a new sweet', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.5,
          quantity: 100
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Chocolate Bar');
      sweetId = res.body.data._id;
    });

    it('should not add sweet without auth', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Gummy Bears',
          category: 'gummy',
          price: 1.5,
          quantity: 50
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets', async () => {
      const res = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search sweets by name', async () => {
      const res = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should search sweets by price range', async () => {
      const res = await request(app)
        .get('/api/sweets/search?minPrice=1&maxPrice=3')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    it('should update sweet', async () => {
      const res = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ price: 3.0 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(3.0);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    it('should not delete sweet as regular user', async () => {
      const res = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(403);
    });

    it('should delete sweet as admin', async () => {
      const res = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
