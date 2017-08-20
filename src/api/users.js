/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const express = require('express');
const httpStatusCodes = require('http-status-codes');
const expressJoiMiddleware = require('express-joi-middleware');
const joi = require('joi');
const customJoi = require('../rule/customRules');
const usersService = require('../service/usersService');
const countries = require('country-data').countries;

const NAMES_PATTERN = /^([a-zA-Z'])+(\\s*[a-zA-Z]+\\s)*([a-zA-Z'])+$/;

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    getRouter,
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Create a user.
 * @param req
 * @param res
 * @param next
 */
function createUser(req, res, next) {
    const body = req.validated.body;
    // Force gender to uppercase
    body.gender = body.gender.toUpperCase();
    usersService.create(body).then((result) => {
        res.status(httpStatusCodes.CREATED).json(result);
    }).catch((error) => {
        res.status(error.statusCode).json(error.message);
        next(error);
    });
}

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Get router.
 * @returns {*}
 */
function getRouter() {
    const router = express.Router();

    const createUserSchema = {
        body: {
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            first_name: joi.string().regex(NAMES_PATTERN).required(),
            last_name: joi.string().regex(NAMES_PATTERN).required(),
            birth_date: customJoi.user().adult().required(),
            gender: customJoi.user().gender().required(),
            street_number: joi.number().required(),
            street_name: joi.string().required(),
            town: joi.string().required(),
            zip_code: joi.number().required(),
            country_code: joi.string().valid(Object.keys(countries)).required(),
            phone: customJoi.user().phone().required(),
            languages: joi.array().min(1).required(),
        },
    };
    router.post(
        '/users',
        expressJoiMiddleware(
            createUserSchema,
            {
                wantResponse: true,
                joiOptions: {
                    abortEarly: false,
                    allowUnknown: false,
                },
            },
        ),
        createUser,
    );

    return router;
}
