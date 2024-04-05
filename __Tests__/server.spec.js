const request = require('supertest');
const app = require('../server'); // Assuming your server file is in the parent directory

describe('Server Initialization', () => {
  test('should start the server and respond with "Logged out"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Logged out');
  });
});
