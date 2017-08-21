/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    proteins: {
        type: Schema.Types.Number,
        required: true,
    },
    carbs: {
        type: Schema.Types.Number,
        required: true,
    },
    fat: {
        type: Schema.Types.Number,
        required: true,
    },
    calories: {
        type: Schema.Types.Number,
        required: true,
    },
});
ingredientSchema.plugin(mongoosePaginate);

/* ************************************* */
/* ********        EXPORTS      ******** */
/* ************************************* */

module.exports = mongoose.model('Ingredient', ingredientSchema);

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
