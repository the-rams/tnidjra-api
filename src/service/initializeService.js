/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const databaseService = require('./databaseService');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
let isInitialized = false;

/* ************************************* */
/* ********        EXPORTS      ******** */
/* ************************************* */

module.exports = {
    middleware,
    run,
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Middleware that send a SERVICE_UNAVAILABLE if service is not initialize.
 * @param req
 * @param res
 * @param next
 */
function middleware(req, res, next) {
    if (!isInitialized) {
        const err = new Error('Microservice not initialized');
        next(err);
        return;
    }

    next();
}

/**
 * Run initialize.
 * @returns {Promise} Promise
 */
function run() {
    return new Promise((resolve, reject) => {
        console.log('Run initialize service');

        // Promise storage
        const promises = [];
        promises.push(databaseService.initialize());

        // Resolve twice because only configuration-api can prevent the startup
        function ending(data) {
            isInitialized = true;
            resolve(data);
        }

        Promise.all(promises).then(ending).catch(ending);
    });
}
