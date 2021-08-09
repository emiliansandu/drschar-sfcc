'use strict';

/**
 * @namespace Account
 */
var page = module.superModule;
var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.extend(page);

/**
 * Account-EditProfile : The Account-EditProfile endpoint renders the page that allows a shopper to edit their profile. The edit profile form is prefilled with the shopper's first name, last name, phone number and email
 * @name Base/Account-EditProfile
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append(
    'EditProfile',
    server.middleware.https,
    csrfProtection.generateToken,
    userLoggedIn.validateLoggedIn,
    consentTracking.consent,
    function (req, res, next) {
        var Resource = require('dw/web/Resource');
        var URLUtils = require('dw/web/URLUtils');
        var accountHelpers = require('*/cartridge/scripts/account/accountHelpers');

        var accountModel = accountHelpers.getAccountModel(req);
        var profileForm = server.forms.getForm('profile');
        profileForm.clear();
        profileForm.customer.firstname.value = accountModel.profile.firstName;
        profileForm.customer.lastname.value = accountModel.profile.lastName;
        profileForm.customer.phone.value = accountModel.profile.phone;
        profileForm.customer.email.value = accountModel.profile.email;
        profileForm.customer.emailconfirm.value = accountModel.profile.email;
        res.render('account/profile', {
            profileForm: profileForm,
            breadcrumbs: [
                {
                    htmlValue: Resource.msg('global.home', 'common', null),
                    url: URLUtils.home().toString()
                },
                {
                    htmlValue: Resource.msg('page.title.myaccount', 'account', null),
                    url: URLUtils.url('Account-Show').toString()
                }
            ]
        });
        next();
    }
);

server.post(
    'MarketingSignup',
    server.middleware.https,
    csrfProtection.validateRequest,
    function (req, res, next) {
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var Logger = require('dw/system/Logger');
        var Transaction = require('dw/system/Transaction');
        var URLUtils = require('dw/web/URLUtils');
        var server = require('server');
       
        //when using post method instead of req.querystring must use req.form
        var emailCustomer=req.form.dwfrm_marketingCloudSignupForm_email;
        var customObjectKeyValueExists = CustomObjectMgr.getCustomObject('marketingCustomer', emailCustomer);
        if(!customObjectKeyValueExists){
        Transaction.begin();
        try {
            //by generating a model/instance of the custom object as arguments the Custom Object ID and primary key ID
            var NewCustomObjectSample = CustomObjectMgr.createCustomObject('marketingCustomer', 'emailAddress');
            //here the value is inserted in the Custom Object model/instance
            NewCustomObjectSample.custom.emailAddress = emailCustomer;
            //the insertion is executed
            Transaction.commit();
        }catch(e){
            Logger.error(e)
            Transaction.rollback();
        }
            server.forms.getForm('marketingCloudSignupForm').clear();
            res.redirect(URLUtils.url('Home-Show'));
            next();
        } 
        else {
            server.forms.getForm('marketingCloudSignupForm').clear();
            res.redirect(URLUtils.url('Home-Show'));
            next();
        } 
    }
         
);

/**
 * Extends Account-SubmitRegistration controller to set subscription
 */
 server.append('SubmitRegistration', function (req, res, next) {
    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Transaction = require('dw/system/Transaction');
        var currViewData = res.getViewData();
        var locale = currViewData.locale;

        if (currViewData.success) {
            var email = currViewData.email;
            var registeredCustomer = CustomerMgr.getCustomerByLogin(email);
            var customerNo = currViewData.authenticatedCustomer.profile.customerNo;
            var checkboxValue = currViewData.form.customer.addtoemaillist.checked;

            if (registeredCustomer) {
                Transaction.wrap(function () {
                    var error;
                    var customer = CustomerMgr.getCustomerByCustomerNumber(customerNo);

                    // assign values to the profile
                    var customerProfile = customer.getProfile();

                    customerProfile.custom.subscribed = checkboxValue;
                });
            }
        }
    });
    return next();
});

module.exports = server.exports();
