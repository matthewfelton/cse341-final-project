const borrowerController = require('../../controllers/borrowers')
const supertest = require('supertest');
const { expect } = require('@jest/globals');


describe('Test Handlers', () => {
    
    test('tests borrowers.getAll', async () => {
        expect(borrowerController.getAll().toBe(200)); 
    })
})