const router = require('express').Router();
const joi = require('joi');
const expressJoiMiddleware = require('express-joi-middleware');
const ingredientService = require('../service/ingredientService');
const httpStatusCodes = require('http-status-codes');

function getRouter() {

  //----------------------------Schema validation------------------------------
  const createIngredientSchema = {
      body: {
          name: joi.string().required(),
          proteins: joi.number().required(),
          carbs: joi.number().required(),
          fat: joi.number().required(),
          calories: joi.number().required(),
      },
  };

  router.get('/ingredients', function(req, res, next) {
    ingredientService.findAll().then((result) => {
        res.status(httpStatusCodes.CREATED).json(result);
    }).catch((error) => {
        res.status(error.statusCode).json(error.message);
        next(error);
    });
  });

  router.get('/ingredients/:id', function(req, res) {
      ingredientService.findById(req.params.id).then((result) => {
          res.status(httpStatusCodes.OK).json(result);
      }).catch((error) => {
          res.status(error.statusCode).json(error.message);
          next(error);
      });
  });

  router.post('/ingredients',
    expressJoiMiddleware(
        createIngredientSchema,
        {
            wantResponse: true,
            joiOptions: {
                abortEarly: false,
                allowUnknown: false,
            }
        }
    ),
    function(req, res) {
      const body = req.body;
      ingredientService.create(body).then((result) => {
          res.status(httpStatusCodes.CREATED).json(result);
      }).catch((error) => {
          res.status(error.statusCode).json(error.message);
          next(error);
      });
    }
  );

  router.put('/ingredients/:id', function(req, res) {
      const body = req.body;
      ingredientService.updatePartialById(req.params.id, body).then((result) => {
          res.status(httpStatusCodes.OK).json(result);
      }).catch((error) => {
          res.status(error.statusCode).json(error.message);
          next(error);
      });
  });

  router.delete('/ingredients/:id', function(req, res) {
    const body = req.body;
    ingredientService.removeById(req.params.id).then((result) => {
        res.status(httpStatusCodes.OK).json('The ingredient was deleted');
    }).catch((error) => {
        res.status(error.statusCode).json(error.message);
        next(error);
    });
  });
  return router;
};
module.exports = {
  getRouter,
};
