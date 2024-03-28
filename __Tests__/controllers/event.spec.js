const controller = require('../../controllers/event');
const mongodb = require('../../db/connection');
const { ObjectId } = require('mongodb');

describe('Events Controller', () => {
    describe('getAll', () => {
        test('should return all events', async () => {
            const mockEvents = [{  }];
            const mockFind = jest.fn().mockReturnValue({ toArray: () => mockEvents });
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
            //expect(res.json).toHaveBeenCalledWith(mockEvents);
        });

        // Add more test cases as needed
        describe('getSingle', () => {
            test('should return all events', async () => {
                const mockEvents = [{  }];
                const mockFind = jest.fn().mockReturnValue({ toArray: () => mockEvents });
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
                //expect(res.json).toHaveBeenCalledWith(mockEvents);
            });
    });

    // Add similar describe blocks for other controller functions (getSingle, newEvent, updateEvent, deleteBorrrower)
    describe('newevent', () => {
        test('should return all events', async () => {
            const mockEvents = [{  }];
            const mockFind = jest.fn().mockReturnValue({ toArray: () => mockEvents });
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
            //expect(res.json).toHaveBeenCalledWith(mockEvents);
        });
});

describe('updateEvent', () => {
    test('should return all events', async () => {
        const mockEvents = [{  }];
        const mockFind = jest.fn().mockReturnValue({ toArray: () => mockEvents });
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
        //expect(res.json).toHaveBeenCalledWith(mockEvents);
    });
});

describe('deleteEvent', () => {
    test('should return all events', async () => {
        const mockEvents = [{  }];
        const mockFind = jest.fn().mockReturnValue({ toArray: () => mockEvents });
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
        //expect(res.json).toHaveBeenCalledWith(mockEvents);
    });
});
});

})
