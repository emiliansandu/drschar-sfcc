"use strict";

var shippingHelpers = require('../../../../../../app_storefront_base/cartridge/client/default/js/checkout/shipping');

var billingHelpers = require('../../../../../../app_storefront_base/cartridge/client/default/js/checkout/billing');

var summaryHelpers = require('../../../../../../app_storefront_base/cartridge/client/default/js/checkout/summary');

var billing = require('./billing');

var adyenCheckout = require('../adyenCheckout');

module.exports = {
  updateCheckoutView: function updateCheckoutView() {
    $('body').on('checkout:updateCheckoutView', function (e, data) {
      shippingHelpers.methods.updateMultiShipInformation(data.order);
      summaryHelpers.updateTotals(data.order.totals);
      data.order.shipping.forEach(function (shipping) {
        shippingHelpers.methods.updateShippingInformation(shipping, data.order, data.customer, data.options);
      });
      var currentStage = location.search.substring( // eslint-disable-line no-restricted-globals
      location.search.indexOf('=') + 1 // eslint-disable-line no-restricted-globals
      );

      if (currentStage === 'shipping') {
        adyenCheckout.methods.renderGenericComponent();
      }

      billingHelpers.methods.updateBillingInformation(data.order, data.customer, data.options);
      billing.methods.updatePaymentInformation(data.order, data.options);
      summaryHelpers.updateOrderProductSummaryInformation(data.order, data.options);
    });
  }
};