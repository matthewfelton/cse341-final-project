const request = require('supertest');
const url = "http://localhost:8080"

describe('Test all my routes', () => {    
    test('should insert a doc into collection', async () => {
        
    const payload = {
        "eventName": "Learn to Jazz Hands",
        "eventType": "Workshop",
        "creator": "Danuta Raine",
        "date": "2024-06-18",
        "ticketed": "false",
        "cost": "0.00"
    } 

    const res = await request(url).post("/event").send(payload).expect(201)

    id = res.text.split(":")[2].replace('"', "").replace("}", "").replace('"', "")
});

test("Should get all docs from the collection", async () => {
    const res = await request(url).get("/event").expect(200)
})

test("Should get a doc from the collection", async () => {
    const res = await request(url).get("/event/" + id).expect(200)
})

test("Should update a doc from the collection", async () => {

    const payload = {
        "eventName": "Learn to Jazz Hands",
        "eventType": "Workshop",
        "creator": "Danuta Raine",
        "date": "2024-06-18",
        "ticketed": "false",
        "cost": "0.00"
    } ;
    const res = await request(url).put("/event/" + id).send(payload).expect(204)
})


test("Should remove a doc from the collection", async () => {
    const res = await request(url).delete("/event/" + id).expect(204)
})


});