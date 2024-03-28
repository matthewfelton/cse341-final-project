const request = require('supertest');
const app = require('../../server.js');

 
describe('Test Route', () => {
  test('getAll /route - success', async (req, res, next) => {
    const response = await request(app).getAll('/borrowers'); // Replace '/route' with your route
    // expect(response.statusCode).toBeGreaterThan(99);
    // expect(response.statusCode).toBeLessThan(600);
        expect(response.statusCode).toBeGreaterThan(499);
  });

})
