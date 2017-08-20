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
 *
 * @param id
 * @returns {*}
 */
function removeById(id) {
    return Ingredient.findByIdAndRemove(id);
}

/**
 * Find by name.
 * @param name
 * @returns {*}
 */
function findByName(name) {
    return Ingredient.findOne({ name });
}

/**
 * Save a Ingredient instance.
 * @param IngredientInstance
 */
function save(ingredientInstance) {
    return ingredientInstance.save();
}

/**
 * Find by id.
 * @param id
 * @returns {*}
 */
function findById(id) {
    return Ingredient.findById(id);
}

/**
 * Find all.
 * @returns {*}
 */
function findAll() {
    return Ingredient.find();
}

/**
 * Find by email.
 * @param name
 * @returns {*}
 */
function findByEmail(email) {
    return Ingredient.findOne({ email });
}

/**
 * Find all paginated.
 * @param queries
 * @param options
 * @returns {*}
 */
function findAllPaginated(queries, options) {
    return Ingredient.paginate(queries, options);
}
