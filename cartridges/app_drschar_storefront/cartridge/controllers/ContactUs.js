'use strict';

/**
 * @namespace ContactUs
 */

var server = require('server');

/**
 * ContactUs-Landing : This endpoint is called to load contact us landing page
 * @name Base/ContactUs-Landing
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Landing', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');

    res.render('contactUs/contactUs.isml', {
        actionUrl: URLUtils.url('ContactUs-Subscribe').toString()
    });

    next();
});

/**
 * ContactUs-Subscribe : This endpoint is called to submit the shopper's contact information
 * @name Base/ContactUs-Subscribe
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - contactFirstName - First Name of the shopper
 * @param {httpparameter} - contactLastName - Last Name of the shopper
 * @param {httpparameter} - contactEmail - Email of the shopper
 * @param {httpparameter} - contactTopic - ID of the "Contact Us" topic
 * @param {httpparameter} - contactComment - Comments entered by the shopper
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
    var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');
    var Site = require('dw/system/Site');
    var recaptcha = require('*/cartridge/helpers/recaptchaGoogle');
    var enableGoogle = Site.getCurrent().getCustomPreferenceValue('enableGoogleRecaptcha');
    var myForm = req.form;
    const g_token = myForm.g_token;
    const ticketData = {
        ticket: {
            comment: {
                body: myForm.contactProblem
            },
            subject: myForm.contactSubject,
            requester: {
                name: myForm.contactFirstName + ' ' + myForm.contactLastName,
                email: myForm.contactEmail
            }
        }
    }
    

    if(enableGoogle == true && g_token){
        var response =  recaptcha.callReCaptchaService(g_token);
        if(response.allowSubmit == false){
            res.setStatusCode(500);
            res.json({
                error: true,
                msg: 'Mayday mayday...do you copy?'
            });
            return;
        }
    }

    var isValidEmailid = emailHelper.validateEmail(myForm.contactEmail);
    if (isValidEmailid) {
        var contactDetails = [myForm.contactFirstName, myForm.contactLastName, myForm.contactEmail, myForm.contactTopic, myForm.contactComment];
        var connectionService = require('*/cartridge/helpers/connectionZendeskService');
        hooksHelper('app.contactUs.subscribe', 'subscribe', contactDetails, function () {});
        connectionService.endPoints.createTicket(JSON.stringify(ticketData));

        res.json({
            success: true,
            msg: Resource.msg('subscribe.to.contact.us.success', 'contactUs', null)
        });
    } else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contactUs', null)
        });
    }

    next();
});

module.exports = server.exports();
