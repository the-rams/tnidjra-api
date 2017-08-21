/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
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
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    ingredients: [
        {
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
        },
    ],
    steps: [
        {
            number: {
                type: Schema.Types.Number,
                required: true,
                unique: true,
            },
            description: {
                type: Schema.Types.String,
                required: true,
            },
        },
    ],
});
recipeSchema.plugin(mongoosePaginate);

/* ************************************* */
/* ********        EXPORTS      ******** */
/* ************************************* */

module.exports = mongoose.model('Recipe', recipeSchema);

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
