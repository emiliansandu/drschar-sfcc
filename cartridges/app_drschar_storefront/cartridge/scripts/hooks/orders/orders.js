"use strict";
var Status = require("dw/system/Status");
var URLUtils = require('dw/web/URLUtils');

function sendMail(order) {
  var Mail = require("dw/net/Mail");
  var status;

  var email = new Mail();
  email.addTo("ocordero@unitedvirtualities.com");
  email.setFrom("no-reply-stord@unitedvirtualities.com");
  email.setSubject("Order updated");
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
      break;
    case 6:
      status = "Cancelled";
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

  email.setContent("The order " + order.orderNo + " was updated as " + status + " the payment method used was: " + order.paymentInstruments[0].paymentMethod );
  email.send();
}

exports.afterPATCH = function (order) {
  sendMail(order);
  return new Status(Status.OK);
};
