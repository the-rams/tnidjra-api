/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const dao = require('../dao/users');
const User = require('../model/User');
const lookup = require('country-data').lookup;
const restError = require('throw.js');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    findAllPaginated: dao.findAllPaginated,
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
 * @param {string} id Id of the user.
 * @param {object} body Body of the user.
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
            const {name, description, status} = body;
            result.name = name || result.name;
            result.description = description || result.description;
            result.status = status || result.status;
            dao.save(result).then(resolve).catch(reject);
        }).catch(reject);
    });
}

/**
 * Update by id.
 * @param {string} id Id of the user.
 * @param {object} body The body of the user.
 * @return {Promise} The result of updating the user.
 */
function updateById(id, body) {
    return new Promise((resolve, reject) => {
        dao.findById(id).then((result) => {
            if (!result) {
                reject(new restError.NotFound());
                return;
            }

            // Update all fields
            const {name, description, status} = body;
            result.name = name;
            result.description = description;
            result.status = status;
            dao.save(result).then(resolve).catch(reject);
        }).catch(reject);
    });
}

/**
 * Remove by id.
 * @param {string} id Id of the user.
 * @return {Promise} The result of removing the user from DB.
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
 * Create a user.
 * @param {object} data representing an user.
 * @return {*} resolved promise, error or created user data.
 */
function create(data) {
    return new Promise((resolve, reject) => {
        dao.findByEmail(data.email).then((result) => {
            if (result) {
                reject(new restError
                .Conflict('A user with this email already exists.'));
            }

            // Create a new user instance
            const userInstance = new User(data);
            // Get country by iso2 code
            userInstance.country = lookup
            .countries({alpha2: data.country_code})[0].name;
            dao.save(userInstance).then((res) => {
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
 * @param {number} id The id of the user.
 * @return {Promise} The result of finding an user.
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
