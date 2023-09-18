const express = require('express');
const bodyParser = require('body-parser');
const Connection = require('./Database/Database.js');
const Api = require('./Service/Api.js');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Use the API router
app.use('/', Api);

// Connect to MongoDB
Connection();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
