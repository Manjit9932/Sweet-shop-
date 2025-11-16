const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

let token;
let adminToken;
let sweetId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Inventory User',
      email: 'inventory@test.com',
      password: 'password123'
    });
  token = userRes.body.token;
  
  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Inventory Admin',
      email: 'invadmin@test.com',
      password: 'password123',
      role: 'admin'
    });
  adminToken = adminRes.body.token;
  
  const sweetRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Test Candy',
      category: 'candy',
      price: 1.0,
      quantity: 50
    });
  sweetId = sweetRes.body.data._id;
});

afterAll(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});
  await mongoose.connection.close();
});

describe('Inventory API', () => {
  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase sweet', async () => {
      const res = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 10 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quantity).toBe(40);
    });

    it('should not purchase more than available', async () => {
      const res = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 100 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Insufficient stock');
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    it('should not restock as regular user', async () => {
      const res = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 20 });

      expect(res.statusCode).toBe(403);
    });

    it('should restock as admin', async () => {
      const res = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 20 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quantity).toBe(60);
    });
  });
});
