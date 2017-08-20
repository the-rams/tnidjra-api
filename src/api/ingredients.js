const router = require('express').Router();
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
function getRouter() {

  router.get('/ingredients', function(req, res) {
    res.send(ingredients);
  });

  router.get('/ingredients/:id', function(req, res) {
    ingredients.forEach(function(ingredient) {
      if (ingredient.id == req.params.id) {
        res.send(ingredient);
      }
    });
  });

  router.post('/ingredients', function(req, res) {
    const ingredient = req.body;
    ingredients.push(ingredient);
    res.status(201).json(ingredient);
  });

  router.put('/ingredients/:id', function(req, res) {
    ingredients.forEach(function(ingredient, key) {
      if (ingredient.id == req.params.id) {
        ingredients[key] = req.body;
        res.status(200).json(ingredients[key]);
      }
    });
  });

  router.delete('/ingredients/:id', function(req, res) {
    ingredients.forEach(function(ingredient, key) {
      if (ingredient.id == req.params.id) {
        ingredients.splice(key, 1);
        res.status(200).json(ingredients[key]);
      }
    });
  });
  return router;
};
module.exports = {
  getRouter,
};
