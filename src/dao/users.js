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
 *
 * @param id
 * @returns {*}
 */
function removeById(id) {
    return User.findByIdAndRemove(id);
}

/**
 * Find by name.
 * @param name
 * @returns {*}
 */
function findByName(name) {
    return User.findOne({ name });
}

/**
 * Save a User instance.
 * @param UserInstance
 */
function save(userInstance) {
    return userInstance.save();
}

/**
 * Find by id.
 * @param id
 * @returns {*}
 */
function findById(id) {
    return User.findById(id);
}

/**
 * Find by email.
 * @param name
 * @returns {*}
 */
function findByEmail(email) {
    return User.findOne({ email });
}

/**
 * Find all paginated.
 * @param queries
 * @param options
 * @returns {*}
 */
function findAllPaginated(queries, options) {
    return User.paginate(queries, options);
}
