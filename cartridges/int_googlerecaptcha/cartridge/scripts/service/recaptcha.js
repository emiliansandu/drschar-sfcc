'use strict';

var svc = require( "dw/svc" );
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

module.exports.reCaptchaService = function (serviceID,params) {
    var serviceRegistry = LocalServiceRegistry.createService(serviceID, {
        createRequest: function(svc, params) {
            svc.setAuthentication('NONE');
            svc.addHeader("Content-Type", "application/json");
            svc.addHeader("Accept", "application/json");
            svc.setRequestMethod("POST");

            return params;
        },
        parseResponse : function(svc, requestObject) {
            var content = requestObject.text;

            return content; 
        },
        mockCall: function(svc, params) {
            return { status: "MOCKED" };
        }
    });

    return serviceRegistry;
};