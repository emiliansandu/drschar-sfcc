"use strict";

var processInclude = require('base/util');

var adyenCheckout = require('./adyenCheckout');

$(document).ready(function () {
  
  $('#selectedPaymentOption').val($('.payment-options .nav-item .active').parent().attr('data-method-id'));
  var selectedPayment = $('#selectedPaymentOption').val();
  if(selectedPayment == 'AdyenComponent'){
    initFrontAdyen();
  }
  processInclude(require('base/checkout/checkout'));
});
$('.payment-options .nav-link').click(function () {
  $('#selectedPaymentOption').val($(this).parent().attr('data-method-id'));
  var selectedPayment = $('#selectedPaymentOption').val();
  if(selectedPayment == 'AdyenComponent'){
    initFrontAdyen();
  }
  processInclude(require('base/checkout/checkout'));
  console.log('change');
});

function initFrontAdyen() {
  // eslint-disable-line
  var name = 'paymentError';
  var error = new RegExp("[?&]".concat(encodeURIComponent(name), "=([^&]*)")).exec(location.search // eslint-disable-line no-restricted-globals
  );
  var paymentStage = new RegExp('[?&]stage=payment([^&]*)').exec(location.search // eslint-disable-line no-restricted-globals
  );

  if (error || paymentStage) {
    if (error) {
      $('.error-message').show();
      $('.error-message-text').text(decodeURIComponent(error[1]));
    }

    adyenCheckout.methods.renderGenericComponent();
  }

  processInclude(require('./checkout/billing'));
  processInclude(require('./checkout/checkout'));
}