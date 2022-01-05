'use strict';

/**
 * Controller to handle the WaitList service, which notifies the customers when products are back in stock
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

/**
 * Endpoint to receive a request from a customer to be added to the waitlist
 */
server.post(
    'sendForm',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var form = req.form;

        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var transaction = require('dw/system/Transaction');
        var ArrayList = require('dw/util/ArrayList');
        var emailsSet = new ArrayList();
        transaction.wrap(function () {
            var customObject = CustomObjectMgr.getCustomObject(
                'Waitlist',
                form.Id
            );
            if (!customObject) {
                customObject = CustomObjectMgr.createCustomObject(
                    'Waitlist',
                    form.Id
                );
            }
            if (!empty(customObject.custom.emails)) {  // eslint-disable-line
                customObject.custom.emails.forEach(function (element, index) {
                    if (form.Email === customObject.custom.emails[index]) {
                        res.json({ error: true });
                    } else {
                        customObject.custom.emails.forEach(function (
                            element,
                            index
                        ) {
                            emailsSet.add(customObject.custom.emails[index]);
                        });
                        emailsSet.add(form.Email);
                        customObject.custom.emails = emailsSet;
                        res.json({ Sucess: true });
                    }
                });
            } else {
                emailsSet.add(customObject.custom.emails);
                emailsSet.add(form.Email);
                customObject.custom.emails = emailsSet;
                res.json({ Sucess: true });
            }
        });
        next();
    }
);

/**
 * Endpoint to render a form to waitlist
 */
server.get('Show', server.middleware.https, function (req, res, next) {
    var waitlistForm = server.forms.getForm('waitlist');
    waitlistForm.clear();

    res.render('rendering/waitlistForm', {
        waitlistForm: waitlistForm
    });
    next();
});



module.exports = server.exports();
