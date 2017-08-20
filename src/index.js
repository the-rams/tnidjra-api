//-------------------imports-----------------
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const initializeService = require('./service/initializeService');
const ingredientsApi = require('./api/ingredients');
const usersApi = require('./api/users');
//-------------------constants---------------
const port = '3000';
//-------------------code--------------------
const app = express();

// Initialize database
initializeService.run();

// Read request body
app.use(bodyParser.json());

// Close api here if not initialized
app.use(initializeService.middleware);

// Router
app.use(ingredientsApi.getRouter());
app.use(usersApi.getRouter());

// Launch server
app.listen(port, function(error) {
  if (error) {
    console.error(error);
    exit(1);
  }
  console.log('Server is running on port : ' + port);
});
