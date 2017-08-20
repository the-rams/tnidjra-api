const router = require('express').Router();
const ingredientService = require('../service/ingredientService');

function getRouter() {


  router.get('/ingredients', function(req, res, next) {
    ingredientService.findAll().then((result) => {
        res.status(httpStatusCodes.CREATED).json(result);
        console.log('response sent');
    }).catch((error) => {
        res.status(error.statusCode).json(error.message);
        next(error);
    });
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
