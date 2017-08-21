/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const dao = require('../dao/ingredients');
const Ingredient = require('../model/Ingredient');
const restError = require('throw.js');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    findAllPaginated: dao.findAllPaginated,
    findAll,
    findById,
    create,
    removeById,
    updateById,
    updatePartialById,
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Update partially by id.
 * @param {number} id Id of the ingredient.
 * @param {object} body Body of the ingredient.
 * @return {Promise} Result of the query.
 */
function updatePartialById(id, body) {
    return new Promise((resolve, reject) => {
        dao.findById(id).then((result) => {
            if (!result) {
                reject(new restError.NotFound());
                return;
            }

            // Update all fields
            const {name, proteins, carbs, fat, calories} = body;
            result.name = name || result.name;
            result.proteins = proteins || result.proteins;
            result.carbs = carbs || result.carbs;
            result.fat = fat || result.fat;
            result.calories = calories || result.calories;
            dao.save(result).then(resolve).catch(reject);
        }).catch(reject);
    });
}

/**
 * Update by id.
 * @param {string} id Id of the ingredient.
 * @param {object} body The body of the ingredient.
 * @return {Promise} The result of updating the ingredient.
 */
function updateById(id, body) {
    return new Promise((resolve, reject) => {
        dao.findById(id).then((result) => {
            if (!result) {
                reject(new restError.NotFound());
                return;
            }

            // Update all fields
            const {name, proteins, carbs, fat, calories} = body;
            result.name = name;
            result.proteins = proteins;
            result.carbs = carbs;
            result.fat = fat;
            result.calories = calories;
            dao.save(result).then(resolve).catch(reject);
        }).catch(reject);
    });
}

/**
 * Remove by id.
 * @param {string} id Id of the ingredient.
 * @return {Promise} The result of removing the ingredient from DB.
 */
function removeById(id) {
    return new Promise((resolve, reject) => {
        dao.findById(id).then((result) => {
            if (!result) {
                reject(new restError.NotFound());
                return;
            }

            dao.removeById(id).then(resolve).catch(reject);
        }).catch(reject);
    });
}

/**
 * Create a ingredient.
 * @param {object} data representing an ingredient.
 * @return {*} resolved promise, error or created ingredient data.
 */
function create(data) {
    return new Promise((resolve, reject) => {
        dao.findByName(data.name).then((result) => {
            if (result) {
                reject(new restError
                .Conflict('An ingredient with this name already exists.'));
            }

            // Create a new ingredient instance
            const ingredientInstance = new Ingredient(data);
            dao.save(ingredientInstance).then((res) => {
                resolve(res);
            }).catch((error) => {
                // TODO: Replace with proper logger
                console.log(error);
                reject(new restError
                .InternalServerError('There was a problem with the database,' +
                    ' contact your administrator'));
            });
        }).catch((error) => {
            // TODO: Replace with proper logger
            console.log(error);
            reject(new restError
            .InternalServerError('There was a problem with the database,' +
                ' contact your administrator'));
        });
    });
}

/**
 * Find by id.
 * @param {number} id The id of the ingredient.
 * @return {Promise} The result of finding an ingredient.
 */
function findById(id) {
    return new Promise((resolve, reject) => {
        dao.findById(id).then((result) => {
            if (!result) {
                reject(new restError.NotFound());
                return;
            }

            resolve(result);
        }).catch(reject);
    });
}

/**
 * Find {array} all The list of all the ingredients.
 * @return {Promise} The result of finding an ingredient.
 */
function findAll() {
    return new Promise((resolve, reject) => {
        dao.findAll().then((result) => {
            if (!result) {
                reject(new restError.NotFound());
                return;
            }

            resolve(result);
        }).catch(reject);
    });
}
