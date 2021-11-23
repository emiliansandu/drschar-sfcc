/* eslint-env es6 */

'use strict';
var Site = require('dw/system/Site');

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
/**
 * Creates a Local Services Framework service definition
 *
 * @returns {dw.svc.Service} - The created service definition.
 */
function getZendeskServiceDefinition() {

    return LocalServiceRegistry.createService('zendeskService', {

        /**
         * A callback function to configure HTTP request parameters before
         * a call is made to Stripe web service
         *
         * @param {dw.svc.Service} svc Service instance
         * @param {string} requestObject - Request object, containing the end point, query string params, payload etc.
         * @returns {string} - The body of HTTP request
         */
        createRequest: function(svc, requestObject) {

            const token = Site.getCurrent().getCustomPreferenceValue('zendeskContacUsKey');
            const user = Site.getCurrent().getCustomPreferenceValue('zendeskEmail');
            const encodedAuthStr = require('dw/util/StringUtils').encodeBase64(user + '/token:' + token);

            svc.addHeader('Content-Type', 'application/json');
            svc.addHeader('Authorization', 'Basic ' + encodedAuthStr);


            var URL = svc.configuration.credential.URL;
            URL += requestObject.endpoint;

            svc.setURL(URL);

            if (requestObject.httpMethod) {
                svc.setRequestMethod(requestObject.httpMethod);
            }

            if (requestObject.payload) {
                return requestObject.payload;
            }
            return null;
        },

        /**
         * A callback function to parse Katapult web service response
         *
         * @param {dw.svc.Service} svc - Service instance
         * @param {dw.net.HTTPClient} httpClient - HTTP client instance
         * @returns {string} - Response body in case of a successful request or null
         */
        parseResponse: function(svc, httpClient) {
            return JSON.parse(httpClient.text);
        },

        mockCall: function(svc) {
            var mockResponsesHelper = require('./mockResponsesHelper');

            return mockResponsesHelper.getMockedResponse(svc);
        },
        getRequestLogMessage: function (request) {
            return request;
        },

        getResponseLogMessage: function (response) {
            return response.error.message;
        }
    });
}
// Only for unit testing!
exports.getZendeskServiceDefinition = getZendeskServiceDefinition;

function zendeskServiceError(callResult) {
    var message = 'Zendesk web service call failed';
    if (callResult && callResult.errorMessage) {
        message += ': ' + callResult.errorMessage;
    }

    var err = new Error(message);
    err.callResult = callResult;
    err.name = 'zendeskServiceError';

    return err;
}


function callService(requestObject) {
    if (!requestObject) {
        throw new Error('Required requestObject parameter missing or incorrect.');
    }

    var callResult = getZendeskServiceDefinition().call(requestObject);

    if (!callResult.ok) {
        return JSON.parse(callResult.errorMessage);
    } 

    return callResult.object;
}

exports.call = callService;

exports.endPoints = {

    createTicket: function(data) {
        var requestObject ={
            endpoint: '/api/v2/tickets.json',
            httpMethod: 'POST',
            payload: data
        }
        return callService(requestObject);
    }
};