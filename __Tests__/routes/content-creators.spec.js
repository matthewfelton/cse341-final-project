// const request = require('supertest');
// const app = require('../../server.js');

 
// describe('Test Route', () => {
//   test('GET /route _ success', async () => {
//     const response = await request(app).get('/content_creators'); 
//     // expect(response.statusCode).toBeGreaterThan(99);
//     // expect(response.statusCode).toBeLessThan(600);
//         expect(response.statusCode).toBe(200);
//   });

//   test('should insert a doc into content_creators collection', async () => {
        
//         const payload = {
//             "firstName": "Annmarie",
//             "lastName": "SanSevero",
//             "jobTitle": "Goddess"
//         };
    
//         const res = await request(app).post("/content_creators").send(payload);
//         expect(res.status).toBeGreaterThan(400);
//     })

    

// });

//Using updated code:
const request = require('supertest');
let id = "";
const url = "http://localhost:8080"

describe('Test all my routes', () => {    
    test('should insert a doc into collection', async () => {
        
    const payload = {
        "firstName": "Annmarie",
        "lastName": "SanSevero",
        "jobTitle": "Goddess"
    } 

    const res = await request(url).post("/content_creators").send(payload).expect(201)

    id = res.text.split(":")[2].replace('"', "").replace("}", "").replace('"', "")
});

test("Should get all docs from the collection", async () => {
    const res = await request(url).get("/content_creators").expect(200)
})

test("Should get a doc from the collection", async () => {
    const res = await request(url).get("/content_creators/" + id).expect(200)
})

test("Should update a doc from the collection", async () => {

    const payload = {
        "firstName": "Annmarie",
        "lastName": "SanSevero",
        "jobTitle": "Goddess of all"
      } ;
    const res = await request(url).put("/content_creators/" + id).send(payload).expect(204)
})


test("Should remove a doc from the collection", async () => {
    const res = await request(url).delete("/content_creators/" + id).expect(204)
})

});