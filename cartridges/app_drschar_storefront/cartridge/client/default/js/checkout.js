'use strict';

var processInclude = require('base/util');
var adyenCheckout = require('./adyenCheckout');

$(document).ready(function () {
    var currentStage = location.search.substring( // eslint-disable-line no-restricted-globals
        location.search.indexOf('=') + 1 // eslint-disable-line no-restricted-globals
    );
    if (currentStage === 'payment') {
        adyenCheckout.methods.renderGenericComponent();
    }
    processInclude(require('./checkout/checkout'));
    $('#selectedPaymentOption').val($('.payment-options .nav-item .active').parent().attr('data-method-id'));  
});
$('.payment-options .nav-link').click(function () {
  $('#selectedPaymentOption').val($(this).parent().attr('data-method-id'));
});