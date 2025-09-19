const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');

// The service is already mocked by another test, but we can be explicit
jest.mock('../../src/services/aiService');

describe('AI Services API Contract', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ userId: 1, username: 'testuser' }, 'your-super-secret-key', { expiresIn: '15m' });
  });

  describe('POST /api/ai/market-research', () => {
    it('should return 200 on successful request', async () => {
      const res = await request(app)
        .post('/api/ai/market-research')
        .set('Authorization', `Bearer ${token}`)
        .send({ itemId: 1 });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('POST /api/ai/generate-listing', () => {
    it('should return 200 on successful request', async () => {
      const res = await request(app)
        .post('/api/ai/generate-listing')
        .set('Authorization', `Bearer ${token}`)
        .send({ itemId: 1 });
      expect(res.statusCode).toEqual(200);
    });
  });
});
