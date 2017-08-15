//-------------------imports-----------------
const express = require('express');
const bodyParser = require('body-parser');
//-------------------constants---------------
const port = '3000';
//-------------------code--------------------
const ingredients = [
  {
    id: 1,
    name: 'carotte',
    proteins: 0.9,
    carbs: 10,
    fat: 0.2,
    calories: 41,
  },
  {
    id: 2,
    name: 'tomate',
    proteins: 0.9,
    carbs: 3.9,
    fat: 0.2,
    calories: 18,
  }
]
const app = express();
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.send('Sha kho');
});

app.get('/ingredients', function(req, res) {
  res.send(ingredients);
});

app.get('/ingredients/:id', function(req, res) {
  ingredients.forEach(function(ingredient) {
    if (ingredient.id == req.params.id) {
      res.send(ingredient);
    }
  });
});

app.post('/ingredients', function(req, res) {
  const ingredient = req.body;
  ingredients.push(ingredient);
  res.status(201).json(ingredient);
});

app.put('/ingredients/:id', function(req, res) {
  ingredients.forEach(function(ingredient, key) {
    if (ingredient.id == req.params.id) {
      ingredients[key] = req.body;
      res.status(200).json(ingredients[key]);
    }
  });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
    exit(1);
  }
  console.log('Server is running on port : ' + port);
});
