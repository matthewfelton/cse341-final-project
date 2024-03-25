//From the documentation

// const {MongoClient} = require('mongodb');

// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);
//   });
// });

//From Instructor code:
const app = require('../../routes/borrowers')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const URL = 'http://localhost:8080';
//const request = supertest(app);


describe('Test Handlers', () => {
//     test('responds to /', async () => {
//         const res = await supertest(URL).get('/');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200)
//     })
    //Questions for tutor. 
    //1. Should /users be /getAll?

    test('responds to /borrowers', async () => {
        const res = await supertest(URL).get('/borrowers');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('should insert a doc into borrowers collection', async () => {
        
        const payload = {
            "firstName": "Annmarie",
            "lastName": "SanSevero",
            "dateBorrowed": "2023-12-31",
            "inventoryBorrowed": "Babylon 5",
            "dateDue": "2024-02-31",
            "conditionReturned": "n/a"
        };
    
        const res = await supertest(URL).post("/borrowers").send(payload);
        expect(res.status).toBe(201);
    })

    // test('responds to /borrowers', async () => {
    //     const res = await supertest(URL).post('/borrowers');
    //     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    //     expect(res.statusCode).toBe(200)
    // })
})
