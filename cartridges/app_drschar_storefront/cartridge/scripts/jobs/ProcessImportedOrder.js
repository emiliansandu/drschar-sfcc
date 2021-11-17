"use strict";

/*
 * Update Order Status
 */
var XMLStreamConstants = require('dw/io/XMLStreamConstants');
var XMLStreamReader = require('dw/io/XMLStreamReader');
var Transaction = require('dw/system/Transaction')
var FileReader = require('dw/io/FileReader');
var OrderMgr = require('dw/order/OrderMgr');
var Status = require('dw/system/Status');
var Order = require('dw/order/Order');
var File = require('dw/io/File');

var ORDER_STATUS_CODES = {
    COMPLETED: Order.ORDER_STATUS_COMPLETED,
    CANCELLED: Order.ORDER_STATUS_CANCELLED
};

var getFiles = function (directoryPath, filePattern) {
    var directory = new File(directoryPath);

    // We only want existing directories
    if (!directory.isDirectory()) {
        throw new Error('Source folder does not exist.');
    }

    var files = directory.list();

    return files.filter(function (filePath) {
        return empty(filePattern) || (!empty(filePattern) && filePath.match(filePattern) !== null);
    }).map(function (filePath) {
        return directoryPath + File.SEPARATOR + filePath;
    });
};

function execute(args) {

    args.FilePattern = '';
    var filesToImport;

    try {
        // Check source directory
        filesToImport = getFiles('IMPEX' + File.SEPARATOR + 'src' + File.SEPARATOR + 'orders', args.FilePattern);
    } catch (e) {
        return new Status(Status.ERROR, 'ERROR', 'Error loading files: ' + e + (e.stack ? e.stack : ''));
    }

    // Overall status to be updated on errors
    var overallStatus = new Status(Status.OK, 'OK', 'Import successful');

    //Read each file XML on the IMPEX folder
    filesToImport.forEach(function (filePath) {
        var relativePath = filePath.substring(6);
        var fileNew = new File(File.getRootDirectory(File.IMPEX), relativePath);
        var folderNew = new FileReader(fileNew, "UTF-8");
        var xmlStreamReader = new XMLStreamReader(folderNew);

        var myObj = {
            'orderNumber': 0,
            'orderStatus': 'none'
        };

        var updateOrders = new Array;

        //Process to read the XML file
        while (xmlStreamReader.hasNext()) {
            var eventType = xmlStreamReader.next();
            if (eventType == XMLStreamConstants.START_ELEMENT || eventType == XMLStreamConstants.END_ELEMENT) {
                if (eventType == XMLStreamConstants.START_ELEMENT) {
                    var localElementName = xmlStreamReader.getLocalName();
                    if (localElementName == "original-order-no") {
                        myObj.orderNumber = xmlStreamReader.getElementText();
                    }
                    if (localElementName == "order-status") {
                        myObj.orderStatus = xmlStreamReader.getElementText();
                    }
                }
                if (eventType == XMLStreamConstants.END_ELEMENT) {
                    var endElementName = xmlStreamReader.getLocalName();
                    if (endElementName == "order") {
                        if (myObj.orderNumber != 0 && myObj.orderStatus != 'none') {
                            var newTopush = new Object;
                            newTopush.orderNumber = myObj.orderNumber;
                            newTopush.orderStatus = myObj.orderStatus;
                            updateOrders.push(newTopush);
                        }
                    }
                }
            }
        }

        try {
            for (var i = 0; i < updateOrders.length; i++) {
                var orderToUpdate = OrderMgr.getOrder(updateOrders[i].orderNumber);
                var status = validStatus(updateOrders[i].orderStatus);
                if (typeof status != 'object') {
                    Transaction.wrap(function () {
                        orderToUpdate.setStatus(status);
                        //sendEmail(orderToUpdate, status);
                    });
                } else {
                    overallStatus = new Status(Status.ERROR, 'Error...');
                }
            }
        } catch (error) {
            overallStatus = new Status(Status.ERROR, 'Error...');
        }

        xmlStreamReader.close();

        //Process to update the status order
        
    });

    return overallStatus;
    
}

function validStatus(status) {
    for (var code in ORDER_STATUS_CODES) {
        if (code == status) {
            return ORDER_STATUS_CODES[code];
        }
    }
    return new Status(Status.ERROR, 'Non valid OrderStatus to update an Order...');
}

function sendEmail(order, status) {
    var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
    var paymentMgr = require('dw/order/PaymentMgr');
    var OrderUtil = require('../hooks/util/orderUtil');
    var Site = require('dw/system/Site');
    var hostpreference = Site.current.getCustomPreferenceValue('hostEmailImage');

    var host = hostpreference || '';
    var locale = order.customerLocaleID;
    var contentAsset = OrderUtil.getContentAsset();
    var paymentid= order.paymentInstrument.paymentMethod;
    var paymentObject=paymentMgr.getPaymentMethod(paymentid);
    var productQuantities=order.productQuantities;
    var productWeight=productQuantities.keySet();

    switch (status) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          COHelpers.sendShippingEmail(order, locale, host, paymentObject, contentAsset, productWeight);
          break;
        case 6:
          COHelpers.sendCancellationEmail(order, locale, host, paymentObject, contentAsset, productWeight);
          break;
        case 7:
          break;
        case 8:
          break;
        default:
          break;
      }

}


module.exports.execute = execute;