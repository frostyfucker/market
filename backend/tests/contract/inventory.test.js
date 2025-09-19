const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');
const jwt = require('jsonwebtoken');

jest.mock('../../src/db');
jest.mock('../../src/services/aiService'); // Also mock the AI service

describe('Inventory API Contract', () => {
  let token;

  beforeAll(() => {
    // Create a token for a mock user to use in authenticated requests
    token = jwt.sign({ userId: 1, username: 'testuser' }, 'your-super-secret-key', { expiresIn: '15m' });
  });

  beforeEach(() => {
    db.query.mockClear();
  });

  describe('POST /api/inventory/upload', () => {
    it('should return 201 on successful upload', async () => {
      // Mock the db.query call inside Item.create
      db.query.mockResolvedValueOnce({ rows: [{ id: 1, brand: 'MockBrand' }] });

      const res = await request(app)
        .post('/api/inventory/upload')
        .set('Authorization', `Bearer ${token}`)
        .field('name', 'test') // multer requires a field
        .attach('garment', Buffer.from('fake garment data'), 'garment.jpg')
        .attach('label', Buffer.from('fake label data'), 'label.jpg');

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.brand).toEqual('MockBrand');
    });
  });

  describe('GET /api/inventory', () => {
    it('should return 200 and a list of items', async () => {
      // Mock the db.query call inside Item.findByUserId
      const mockItems = [{ id: 1, brand: 'MockBrand' }, { id: 2, brand: 'AnotherBrand' }];
      db.query.mockResolvedValueOnce({ rows: mockItems });

      const res = await request(app)
        .get('/api/inventory')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toEqual(2);
    });
  });
});
