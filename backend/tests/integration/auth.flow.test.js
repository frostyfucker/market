const request = require('supertest');
const app = require('../../src/app'); // Use the real app
const db = require('../../src/db'); // We will mock this

// Mock the db module
jest.mock('../../src/db');

describe('Auth Flow Integration', () => {
  beforeEach(() => {
    db.query.mockClear();
  });

  it('should allow a user to register and then log in', async () => {
    const username = `testuser_${Date.now()}`;
    const password = 'password123';
    const passwordHash = await require('bcrypt').hash(password, 10);

    // Mock the db query chain
    db.query
      // 1. For registration: AuthService.register -> User.findByUsername
      .mockResolvedValueOnce({ rows: [] }) // -> returns no user, so username is available
      // 2. For registration: AuthService.register -> User.create
      .mockResolvedValueOnce({ rows: [{ id: 1, username }] }) // -> returns the new user
      // 3. For login: AuthService.login -> User.findByUsername
      .mockResolvedValueOnce({ rows: [{ id: 1, username, password_hash: passwordHash }] }); // -> returns the user to log in


    // 1. Register the new user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ username, password });

    expect(registerRes.statusCode).toEqual(201);

    // 2. Log in with the new credentials
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username, password });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('accessToken');
  });
});
