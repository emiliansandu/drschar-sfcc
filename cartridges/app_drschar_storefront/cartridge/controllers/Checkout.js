'use strict';

/**
 * @namespace Checkout
 */

var page = module.superModule;
var server = require('server');

var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var Site = require('dw/system/Site');

server.extend(page);

/**
 * Main entry point for Checkout
 */

  /**
  * Checkout-Login : The Checkout-Login endpoint will render a checkout landing page that allows the shopper to select checkout as guest or as returning shopper
  * @name Base/Checkout-Login
  * @function
  * @memberof Checkout
  * @param {middleware} - server.middleware.https
  * @param {middleware} - consentTracking.consent
  * @param {middleware} - csrfProtection.generateToken
  * @param {category} - sensitive
  * @param {renders} - isml
  * @param {serverfunction} - get
  */
server.prepend(
    'Login',
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function (req, res, next) {
        var BasketMgr = require('dw/order/BasketMgr');
        var URLUtils = require('dw/web/URLUtils');

        var currentBasket = BasketMgr.getCurrentBasket();
        var reportingURLs;

        var subTotals = currentBasket.merchandizeTotalGrossPrice.value;
        var orderMinimum=Site.current.getCustomPreferenceValue('orderMinimumThresholdAmount');
        
        if (subTotals<orderMinimum) {
            res.redirect(URLUtils.url('Cart-Show'));
            return next();
        }
        return next();
    }
);

module.exports = server.exports();
