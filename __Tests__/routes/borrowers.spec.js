const request = require('supertest');
const url = "http://localhost:8080"

describe('Test all my routes', () => {    
    test('should insert a doc into collection', async () => {
        
    const payload = {
        "firstName": "Josh",
        "lastName": "Herring",
        "dateBorrowed": "2023-12-31",
        "inventoryBorrowed": "Dune",
        "dateDue": "2024-02-31",
        "conditionReturned": "n/a"
    } 

    const res = await request(url).post("/borrowers").send(payload).expect(201)

    id = res.text.split(":")[2].replace('"', "").replace("}", "").replace('"', "")
});

test("Should get all docs from the collection", async () => {
    const res = await request(url).get("/borrowers").expect(200)
})

test("Should get a doc from the collection", async () => {
    const res = await request(url).get("/borrowers/" + id).expect(200)
})

test("Should update a doc from the collection", async () => {

    const payload = {
        "firstName": "Josh",
        "lastName": "Herring",
        "dateBorrowed": "2023-12-31",
        "inventoryBorrowed": "Ranger's Apprentice",
        "dateDue": "2024-02-31",
        "conditionReturned": "n/a"
      } ;
    const res = await request(url).put("/borrowers/" + id).send(payload).expect(204)
})


test("Should remove a doc from the collection", async () => {
    const res = await request(url).delete("/borrowers/" + id).expect(204)
})


});