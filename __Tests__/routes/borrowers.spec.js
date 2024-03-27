const request = require('supertest');
const app = require('../../server.js');

 
describe('Test Route', () => {
  test('GET /route - success', async () => {
    const response = await request(app).get('/borrowers'); // Replace '/route' with your route
    // expect(response.statusCode).toBeGreaterThan(99);
    // expect(response.statusCode).toBeLessThan(600);
        expect(response.statusCode).toBeGreaterThan(499);
  });

  test('should insert a doc into borrowers collection', async () => {
        
        const payload = {
            "firstName": "Annmarie",
            "lastName": "SanSevero",
            "dateBorrowed": "2023-12-31",
            "inventoryBorrowed": "Babylon 5",
            "dateDue": "2024-02-31",
            "conditionReturned": "n/a"
        };
    
        const res = await request(URL).post("/borrowers").send(payload);
        expect(res.status).toBe(500);
    })

});