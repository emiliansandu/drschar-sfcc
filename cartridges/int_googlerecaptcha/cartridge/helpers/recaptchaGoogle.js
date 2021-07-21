'use strict';
var Site = require('dw/system/Site');
var reCaptchaService = require('*/cartridge/scripts/service/recaptcha');
var Resource = require('dw/web/Resource');

function getService() {
    var service = reCaptchaService.reCaptchaService('google.recaptcha.api.drschar');
    return service;
}
function callReCaptchaService(key){
    var service = getService();
    var secretKey = Site.getCurrent().getCustomPreferenceValue('googleRecaptchaSecretKey');
    var newUrl = service.configuration.credential.URL + 'secret='+ secretKey + '&response=' + key;
    service.setURL(newUrl);
    var response = service.call();
    var msg = response.msg;
    if (response != null && response.msg == 'OK' && response.status == 'OK') {
        if (response.object != null ) {
            var captchaResponse = JSON.parse(response.object);
            if (captchaResponse.success == true) {
                var botScoreThreshold = Site.getCurrent().getCustomPreferenceValue('botScoreThreshold') || .5;
                response = captchaResponse;
                response.allowSubmit = response.score > botScoreThreshold;
            } else {
                response = response.errorMessage;
            }
        }else {
            response = {
                message: Resource.msg('recaptcha.service.verification', 'googlerecaptcha', null)
            };
        }

     } else {
        response = {
            message: Resource.msg('recaptcha.service.verification', 'googlerecaptcha', null)
        };
    }

    return response;
}
   

module.exports = {
    callReCaptchaService: callReCaptchaService
};