"use strict";
var Status = require("dw/system/Status");
var OrderUtil = require('../util/orderUtil');
var paymentMgr = require('dw/order/PaymentMgr');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var Site = require('dw/system/Site');
var hostpreference = Site.current.getCustomPreferenceValue('hostEmailImage');

function sendMail(order) {
  var status;
  var host = hostpreference || '';
  var locale = order.customerLocaleID;
  var contentAsset = OrderUtil.getContentAsset();
  var paymentid= order.paymentInstrument.paymentMethod;
  var paymentObject=paymentMgr.getPaymentMethod(paymentid);
  var productQuantities=order.productQuantities;
  var productWeight=productQuantities.keySet();

  // sets the content of the mail as plain string
  switch (parseInt(order.status)) {
    case 0:
      status = "Not Confirmed";
      break;
    case 1:
      status = "Exported";
      break;
    case 2:
      status = "Confirmed";
      break;
    case 3:
      status = "Failed";
      break;
    case 4:
      status = "Open";
      break;
    case 5:
      status = "Completed";
      COHelpers.sendConfirmationEmail(order, locale, host, paymentObject, contentAsset, productWeight);
      break;
    case 6:
      status = "Cancelled";
      COHelpers.sendCancellationEmail(order, locale, host, paymentObject, contentAsset, productWeight);
      break;
    case 7:
      status = "Replaced";
      break;
    case 8:
      status = "Failed";
      break;
    default:
      status = "";
      break;
  }
}

exports.afterPATCH = function (order) {
  sendMail(order);
  return new Status(Status.OK);
};
