// Final Project Server.js file
const express = require('express');
const cors = require('cors');
const app = express();

const mongodb = require('./db/connection');

const port = process.env.port || 8080;

app
    .use(cors({
        origin: '*', // Replace with your frontend domain or '*' for any origin
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', // Add DELETE and PUT to the allowed methods
        credentials: true, // Include cookies or authorization headers
    }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', require('./routes'));
    
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`The Database has connected, and the server is now actively listening on ${port}`);
    }
});