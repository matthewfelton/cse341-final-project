const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Media Management System API',
        description: 'Media Management System  API',
    },
    host: 'cse341-final-project-my43.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });