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
 * @param {object} req
 * @param {object} res
 * @param {object} next
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
 * @return {Promise} The result of running the server.
 */
function run() {
    return new Promise((resolve, reject) => {
        console.log('Run initialize service');

        // Promise storage
        const promises = [];
        promises.push(databaseService.initialize());

        // Resolve twice because only configuration-api can prevent the startup
        /**
        *
        * @param {object} data The data of the connection.
        */
        function ending(data) {
            isInitialized = true;
            resolve(data);
        }

        Promise.all(promises).then(ending).catch(ending);
    });
}
