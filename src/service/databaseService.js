/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const mongoose = require('mongoose');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    initialize,
    isUp,
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Is Database connection up ?
 * @returns {boolean}
 */
function isUp() {
    return mongoose.connection.readyState === 1;
}

/**
 * Initialize database.
 * @returns {Promise}
 */
function initialize() {
    return new Promise((resolve, reject) => {
        // Put new Promise system
        mongoose.Promise = Promise;

        mongoose
            .connect('mongodb://localhost/tnidjra')
            .then(() => {
                console.log('Mongodb connection open');
                console.log('End initialize database');
                resolve();
            })
            .catch((err) => {
                console.log('Mongoose connection error');
                console.log(err);
                reject(err);
            });
    });
}
