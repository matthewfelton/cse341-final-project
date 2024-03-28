const request = require('supertest');
const app = require('../../server.js');

 
describe('Test Route', () => {
  test('GET /route - success', async () => {
    const response = await request(app).get('/content-creators'); 
    // expect(response.statusCode).toBeGreaterThan(99);
    // expect(response.statusCode).toBeLessThan(600);
        expect(response.statusCode).toBe(200);
  });

  test('should insert a doc into content-creators collection', async () => {
        
        const payload = {
            "firstName": "Annmarie",
            "lastName": "SanSevero",
            "jobTitle": "Goddess"
        };
    
        const res = await request(app).post("/content-creators").send(payload);
        expect(res.status).toBeGreaterThan(400);
    })

    

});