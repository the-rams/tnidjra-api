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
 * @return {boolean} True if the server is up.
 */
function isUp() {
    return mongoose.connection.readyState === 1;
}

/**
 * Initialize database.
 * @return {Promise} Result of running the server.
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
