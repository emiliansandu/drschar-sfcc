/* global empty */

'use strict';

/**
 * Instagram API integration service definition.
 *
 * Used to access Instagram Feed API:
 * - https://graph.instagram.com/me
 */

// SFCC API includes
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
/* Private Helper Methods
   ========================================================================== */

/**
 * Takes a JS object and returns a string with each key/value property pair
 * on a new line for log formatting.
 *
 * @param {string} response - An object to get a string for in order to log it
 *      to the custom error logs.
 * @returns {Object} - Returns a string created from all of the object's
 *      key / value properties.
 */

/**
 * Gets any query parameters from the arguments object supplied to the service
 * call, and returns them as a formated query string.
 *
 * @param {Object} args - The key/value pair containing any arguments passed to
 *      the service call.
 * @param {string} apiPath - The URI path for the REST API call.
 * 
 * @returns {string} - Returns the formated query string parameter string.
 */
function getURLParams(args, apiPath) {
    var urlParams = '';

   urlParams += !empty(args.apiPath) ?
        (args.apiPath) : null;

    if (!empty(args.accessTokenParam)) {
        urlParams += '&access_token=' + args.accessTokenParam;
    }

    return urlParams;
}

/* Public / Exported Methods
   ========================================================================== */

/**
 * Gets the service instance from the local service registry and configures it
 * for use.
 *
 * @return {dw.svc.HTTPService} - Returns the instagram.http.get service instance.
 */
function getService() {
    var insgmService = LocalServiceRegistry.createService('instagram.http.get', {
        /**
         * @param {dw.svc.Service} svc - The service instance for the call.
         * @param {Object} args - Parameters given to the call method.
         * @param {string} [args.requestMethod] - The HTTP verb to be used for
         *      the request to the Instagram API.
         * @returns {Object} - Request object to give to the execute method.
         */
        createRequest: function (svc, args) {
            var apiPath = args.apiPath;
            var serviceConfiguration = svc.getConfiguration();
            var credential = serviceConfiguration.getCredential();
            var missing = '';
            var contentType = !empty(args.contentTypeHeader) ?
                args.contentTypeHeader : 'application/json';
            var requestMethod = !empty(args.requestMethod) ?
                args.requestMethod : 'GET';

            // If adding the access token as an Authorization Bearer token was
            // specified in the arguments, then add the header.
            if (!empty(args.accessTokenHeader)) {
                svc.addHeader(
                    'Authorization', 'Bearer ' + args.accessTokenHeader);
            }

            var apiSecret = credential.getPassword();
            var URL = credential.getURL();

            URL += getURLParams(args, apiPath);

            svc.setRequestMethod(requestMethod);
            svc.setURL(URL);
            svc.addHeader('charset', 'utf-8');
            svc.addHeader('Content-Type', contentType);

            // If call data for the body of the request was passed, then return
            // it so that it will be added to the call.
            if (!empty(args.callData)) {
                return args.callData;
            }

            return {};
        },

        parseResponse: function (svc, client) {

            return client.text;
        },

        filterLogMessage: function (msg) {
            return msg;
        }
    });

    return insgmService;
}

/**
 * Generates a Secured-One-Time-Token (SOTT) wich is needed for new
 * account registration.
 *
 * @returns {Object} - Returns the results from the API call.
 */
function getFeed() {
    var svc = getService();
    var callParams = {
        requestMethod: 'GET',
        apiPath: 'me/media?fields=id,caption,media_type,media_url',
        includeApiSecret: false,
        accessTokenParam:'IGQVJYbk9hYlZAUVmp6eWRfdF9TbUZALdV90ckJZAamdtOHotMTBRMlhHOFhrNDcxTFRQbnN6WVNnSUV6TkpheXA3ZAmNIMXN1SjVZAQkxUczRsOEg0dW16WVhiT011d3FpRVZAIYTY5NlZAKVW5BaV9wa3ZAfQgZDZD'
    };

    var result = svc.call(callParams);

    return JSON.parse(result.object);
}



module.exports = {
    getFeed: getFeed
};
