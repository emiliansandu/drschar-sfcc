"use strict";

/**
* Send request to adyen to get payment methods based on country code and currency
*

* @input Basket : dw.order.Basket
* @input countryCode : String
* @output customer : Customer
*/
// script include
var Logger = require('dw/system/Logger');

var AdyenHelper = require('*/cartridge/scripts/util/adyenHelper');

function getMethods(basket, customer, countryCode) {
  try {
    var service = AdyenHelper.getService(AdyenHelper.SERVICE.CHECKOUTPAYMENTMETHODS);

    if (!service) {
      throw new Error('Could not do /paymentMethods call');
    }

    var paymentAmount;
    var currencyCode; // paymentMethods call from checkout

    if (basket) {
      paymentAmount = basket.getTotalGrossPrice() ? AdyenHelper.getCurrencyValueForApi(basket.getTotalGrossPrice()).getValueOrNull() : 1000;
      currencyCode = basket.currencyCode;
    } else {
      // paymentMethods call from My Account
      paymentAmount = 1000;
      currencyCode = session.currency.currencyCode;
    }

    var paymentMethodsRequest = {
      merchantAccount: AdyenHelper.getAdyenMerchantAccount(),
      amount: {
        currency: currencyCode,
        value: paymentAmount
      }
    };

    if (countryCode) {
      paymentMethodsRequest.countryCode = countryCode;
    } // check logged in shopper for oneClick


    var profile = customer && customer.registered && customer.getProfile() ? customer.getProfile() : null;
    var customerID = null;

    if (profile && profile.getCustomerNo()) {
      customerID = profile.getCustomerNo();
    }

    if (customerID) {
      paymentMethodsRequest.shopperReference = customerID;
    }

    var xapikey = AdyenHelper.getAdyenApiKey();
    service.addHeader('Content-type', 'application/json');
    service.addHeader('charset', 'UTF-8');
    service.addHeader('X-API-key', xapikey);
    var callResult = service.call(JSON.stringify(paymentMethodsRequest));

    if (!callResult.isOk()) {
      throw new Error("/paymentMethods call error code".concat(callResult.getError().toString(), " Error => ResponseStatus: ").concat(callResult.getStatus(), " | ResponseErrorText: ").concat(callResult.getErrorMessage(), " | ResponseText: ").concat(callResult.getMsg()));
    }

    var resultObject = callResult.object;

    if (!resultObject || !resultObject.getText()) {
      throw new Error('No correct response from /paymentMethods call');
    }

    return JSON.parse(resultObject.getText());
  } catch (e) {
    Logger.getLogger('Adyen').fatal("Adyen: ".concat(e.toString(), " in ").concat(e.fileName, ":").concat(e.lineNumber));
  }
}

module.exports = {
  getMethods: getMethods
};