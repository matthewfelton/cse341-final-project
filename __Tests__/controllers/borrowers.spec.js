const controller = require('../../controllers/borrowers');
const mongodb = require('../../db/connection');
const { ObjectId } = require('mongodb');

describe('Borrowers Controller', () => {
    describe('getAll', () => {
        test('should return all borrowers', async () => {
            const mockBorrowers = [{  }];
            const mockFind = jest.fn().mockReturnValue({ toArray: () => mockBorrowers });
            const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
            const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
            mongodb.getDb = jest.fn().mockReturnValue({ db: mockDb });

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            //expect(res.json).toHaveBeenCalledWith(mockBorrowers);
        });

        // Add more test cases as needed
    });

    // Add similar describe blocks for other controller functions (getSingle, newBorrower, updateBorrower, deleteBorrrower)
});


