"use strict";

/**
 * Updates the payment information in checkout, based on the supplied order model
 * @param {Object} order - checkout model to use as basis of new truth
 */
function updatePaymentInformation(order) {
  // update payment details
  var $paymentSummary = $('.payment-details');
  var htmlToAppend = '';

  if (order.billing.payment && order.billing.payment.selectedPaymentInstruments && order.billing.payment.selectedPaymentInstruments.length > 0) {
    var selectedPaymentInstrument = order.billing.payment.selectedPaymentInstruments[0];

    if (selectedPaymentInstrument.selectedAdyenPM) {
      htmlToAppend += "<div><span>".concat(selectedPaymentInstrument.selectedAdyenPM, "</span></div>");
    }

    if (selectedPaymentInstrument.selectedIssuerName) {
      htmlToAppend += "<div><span>".concat(selectedPaymentInstrument.selectedIssuerName, "</span></div>");
    }

    if (selectedPaymentInstrument.maskedCreditCardNumber) {
      htmlToAppend += "<div>".concat(selectedPaymentInstrument.maskedCreditCardNumber, "</div>");
    }

    if (selectedPaymentInstrument.expirationMonth && selectedPaymentInstrument.expirationYear) {
      htmlToAppend += "<div><span>".concat(order.resources.cardEnding, " ").concat(selectedPaymentInstrument.expirationMonth, "/").concat(selectedPaymentInstrument.expirationYear, "</span></div>");
    }
  }

  $paymentSummary.empty().append(htmlToAppend);
}

module.exports = {
  methods: {
    updatePaymentInformation: updatePaymentInformation
  }
};