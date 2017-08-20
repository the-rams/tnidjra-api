/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const Joi = require('joi');
const lookup = require('country-data').lookup;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const moment = require('moment');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
// eslint-disable-next-line
module.exports = Joi.extend(joi => ({
    name: 'user',
    language: {
        phonePrefix: 'The prefix you entered is not valid',
        phone: 'The phone number is not valid!',
        adult: 'You must be at least 18 years old to use our services',
        gender: 'The gender must be one of the following \'MALE\' or \'FEMALE\'',
    },
    rules: [
        {
            name: 'phone',
            validate(params, value, state, options) {
                const phonePrefix = value.split('-')[0];
                const phoneNumber = value.split('-')[1];
                const country = lookup.countries({ countryCallingCodes: phonePrefix })[0];
                if (!country) {
                    return this.createError('user.phonePrefix', { value }, state, options);
                }

                const phoneNumberObject = phoneUtil.parse(phoneNumber, country.alpha2);

                if (!phoneUtil.isValidNumber(phoneNumberObject)) {
                    return this.createError('user.phone', { value }, state, options);
                }

                return value;
            },
        },
        {
            name: 'adult',
            validate(params, value, state, options) {
                const birthDate = moment(value);
                const today = moment();
                const age = today.diff(birthDate, 'years');
                if (age < 18) {
                    return this.createError('user.adult', { value }, state, options);
                }

                return value;
            },
        },
        {
            name: 'gender',
            validate(params, value, state, options) {
                const gender = value.toUpperCase();
                if (gender !== 'MALE' && gender !== 'FEMALE') {
                    return this.createError('user.gender', { value }, state, options);
                }

                return value;
            },
        },
    ],
}));
