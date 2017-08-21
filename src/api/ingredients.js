// eslint-disable-next-line new-cap
const express = require('express');
const joi = require('joi');
const expressJoiMiddleware = require('express-joi-middleware');
const ingredientService = require('../service/ingredientService');
const httpStatusCodes = require('http-status-codes');

/**
 * Create an ingredient.
 * @param {object} req http request.
 * @param {object} res http response.
 * @param {object} next the next middleware in the stack.
 */
function createIngredient(req, res, next) {
    const body = req.body;
    ingredientService.create(body).then((result) => {
        res.status(httpStatusCodes.CREATED).json(result);
    }).catch((error) => {
        res.status(error.statusCode).json(error.message);
        next(error);
    });
}

/**
 *
 * @return {*} router.
 */
function getRouter() {
  // ----------------------------Schema validation------------------------------
  // eslint-disable-next-line new-cap
  const router = express.Router();
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
            },
        }
    ),
    createIngredient
  );

  router.put('/ingredients/:id', function(req, res, next) {
      const body = req.body;
      ingredientService.updatePartialById(req.params.id, body)
      .then((result) => {
        res.status(httpStatusCodes.OK).json(result);
      }).catch((error) => {
        res.status(error.statusCode).json(error.message);
        next(error);
      });
  });

  router.delete('/ingredients/:id', function(req, res) {
    ingredientService.removeById(req.params.id).then((result) => {
        res.status(httpStatusCodes.OK)
        .json(`The ingredient '${result.name}' was deleted`);
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
