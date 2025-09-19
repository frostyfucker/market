const request = require('supertest');
const app = require('../../src/app'); // Use the real app
const db = require('../../src/db'); // We will mock this

// Mock the db module
jest.mock('../../src/db');

describe('Auth API Contract', () => {
  beforeEach(() => {
    // Reset mocks before each test
    db.query.mockClear();
  });

  describe('POST /api/auth/register', () => {
    it('should return 201 on successful registration', async () => {
      // Mock db response for creating a user. First for findByUsername (empty), then for create.
      db.query.mockResolvedValueOnce({ rows: [] }).mockResolvedValueOnce({ rows: [{ id: 1, username: 'testuser' }] });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(201);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 on successful login', async () => {
        // Mock db response for finding a user
        const passwordHash = await require('bcrypt').hash('password123', 10);
        db.query.mockResolvedValueOnce({ rows: [{ id: 1, username: 'testuser', password_hash: passwordHash }] });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
    });
  });
});
