/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const Ingredient = require('../model/Ingredient');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    findAllPaginated,
    findAll,
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
 * Delete the ingredient specified by id.
 * @param {string} id Id of the ingredient.
 * @return {*} corresponding ingredient.
 */
function removeById(id) {
    return Ingredient.findByIdAndRemove(id);
}

/**
 * Find by name.
 * @param {string} name name of the ingredient.
 * @return {*} corresponding ingredient.
 */
function findByName(name) {
    return Ingredient.findOne({name});
}

/**
 * Save a Ingredient instance.
 * @param {object} ingredientInstance ingredient to create.
 * @return {object} saved ingredient.
 */
function save(ingredientInstance) {
    return ingredientInstance.save();
}

/**
 * Find by id.
 * @param {number} id The id of the ingredient
 * @return {*} The corresponding ingredient.
 */
function findById(id) {
    return Ingredient.findById(id);
}

/**
 * Find all.
 * @return {*} The corresponding ingredient.
 */
function findAll() {
    return Ingredient.find();
}

/**
 * Find by email.
 * @param {string} email The email of the ingredient.
 * @return {*} The corresponding ingredient.
 */
function findByEmail(email) {
    return Ingredient.findOne({email});
}

/**
 * Find all paginated.
 * @param {object} queries The query to run on mongodb.
 * @param {object} options Options of the query.
 * @return {*} Paginated list of ingredients.
 */
function findAllPaginated(queries, options) {
    return Ingredient.paginate(queries, options);
}
