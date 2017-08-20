//-------------------imports-----------------
const express = require('express');
const bodyParser = require('body-parser');
const ingredientsApi = require('./src/api/ingredients');
//-------------------constants---------------
const port = '3000';
//-------------------code--------------------
const app = express();
app.use(bodyParser.json());
app.use(ingredientsApi.getRouter());
app.listen(port, function(error) {
  if (error) {
    console.error(error);
    exit(1);
  }
  console.log('Server is running on port : ' + port);
});
