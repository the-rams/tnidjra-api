/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const User = require('../model/User');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    findAllPaginated,
    findById,
    findByName,
    findByEmail,
    save,
    removeById,
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Delete corresponding User.
 * @param {string} id The id of the user.
 * @return {*} The user.
 */
function removeById(id) {
    return User.findByIdAndRemove(id);
}

/**
 * Find by name.
 * @param {string} name The name of the user.
 * @return {*} The user.
 */
function findByName(name) {
    return User.findOne({name});
}

/**
 * Save a User instance.
 * @param {object} userInstance The user to create.
 * @return {object} The saved user.
 */
function save(userInstance) {
    return userInstance.save();
}

/**
 * Find by id.
 * @param {string} id Id of the User.
 * @return {*} The corresponding user.
 */
function findById(id) {
    return User.findById(id);
}

/**
 * Find by email.
 * @param {string} email The name of the user.
 * @return {*} The user.
 */
function findByEmail(email) {
    return User.findOne({email});
}

/**
 * Find all paginated.
 * @param {object} queries the queries to run on mongodb.
 * @param {object} options options of the query.
 * @return {*} Paginated list of users.
 */
function findAllPaginated(queries, options) {
    return User.paginate(queries, options);
}
