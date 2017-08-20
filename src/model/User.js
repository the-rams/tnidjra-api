/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
const Schema = mongoose.Schema;
const genderEnumList = ['MALE', 'FEMALE'];

const userSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    first_name: {
        type: Schema.Types.String,
        required: true,
    },
    last_name: {
        type: Schema.Types.String,
        required: true,
    },
    birth_date: {
        type: Schema.Types.Date,
        required: true,
    },
    gender: {
        type: Schema.Types.String,
        required: true,
        enum: genderEnumList,
    },
    street_number: {
        type: Schema.Types.Number,
        required: true,
    },
    street_name: {
        type: Schema.Types.String,
        required: true,
    },
    town: {
        type: Schema.Types.String,
        required: true,
    },
    zip_code: {
        type: Schema.Types.Number,
        required: true,
    },
    country: {
        type: Schema.Types.String,
        required: true,
    },
    phone: {
        type: Schema.Types.String,
        required: true,
    },
    languages: [
        {
            type: Schema.Types.String,
            required: true,
        },
    ],
});
userSchema.plugin(mongoosePaginate);

/* ************************************* */
/* ********        EXPORTS      ******** */
/* ************************************* */

module.exports = mongoose.model('User', userSchema);

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
