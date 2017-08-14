//-------------------imports-----------------
const express = require('express');
//-------------------constants---------------
const port = '3000';
//-------------------code--------------------
const app = express();
app.get('/', function(req, res) {
  res.send('Sha kho');
});
app.listen(port, function(error) {
  if (error) {
    console.error(error);
    exit(1);
  }
  console.log('Server is running on port : ' + port);
});
