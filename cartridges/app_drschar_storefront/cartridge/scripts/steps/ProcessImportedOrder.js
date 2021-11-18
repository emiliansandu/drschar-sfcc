"use strict";

/*
 * Update Order Status
 */
var XMLStreamConstants = require('dw/io/XMLStreamConstants');
var StepUtil = require('~/cartridge/scripts/util/StepUtil');
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

/**
 * @method fileAction
 *
 * @description Performs file action : Archive or Remove the file
 *
 * @param {dw.io.File} action     - Action to perform (REMOVE,KEEP,ARCHIVE)
 * @param {dw.io.File} filePath     - path of source file
 * @param {String} archivePath     - path to archive folder
 * */
 function fileAction(action, filePath, archivePath) {
    try {
        var file = new File(filePath);
        if (action === 'ARCHIVE') {
            // create archive folder if it doesn't exist
            new File([File.IMPEX, archivePath].join(File.SEPARATOR)).mkdirs();

            var fileToMoveTo = new File([File.IMPEX, archivePath, file.name].join(File.SEPARATOR));
            file.renameTo(fileToMoveTo);
        } else if (action === 'REMOVE') { // remove source file
            file.remove();
        }
    } catch (e) {
        return new Status(Status.ERROR, 'ERROR', '[StandardImport.js] fileAction() method crashed on line:{0}. ERROR: {1}', e.lineNumber , e.message);
    }
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

function noFileFound(status) {
    var msg = 'No files found for import.';

    switch (status) {
    case 'ERROR':
        return new Status(Status.ERROR, 'ERROR', msg);
    default:
        return new Status(Status.OK, 'NO_FILE_FOUND', msg);
    }
}

function updateOrders(args) {
    var filesToImport;

    try {
        // Check source directory
        filesToImport = getFiles('IMPEX' + File.SEPARATOR + args.SourceFolder, args.FilePattern);
    } catch (e) {
        return new Status(Status.ERROR, 'ERROR', 'Error loading files: ' + e + (e.stack ? e.stack : ''));
    }

    // No files found
    if (!filesToImport || filesToImport.length == 0) {
        return noFileFound(args.NoFileFoundStatus);
    }

    // Overall status to be updated on errors
    var overallStatus = new Status(Status.OK, 'OK', 'Update successful');

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

        var objectOrders = new Array;
        var archivePath = StepUtil.replacePathPlaceholders(args.ArchivePath);

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
                            objectOrders.push(newTopush);
                        }
                    }
                }
            }
        }
        //Process to update the status order
        try {
            for (var i = 0; i < objectOrders.length; i++) {
                var orderToUpdate = OrderMgr.getOrder(objectOrders[i].orderNumber);
                var status = validStatus(objectOrders[i].orderStatus);
                if (typeof status != 'object') {
                    Transaction.wrap(function () {
                        orderToUpdate.setStatus(status);
                        sendEmail(orderToUpdate, status);
                    });
                } else {
                    overallStatus = new Status(Status.ERROR, 'Error...');
                }
            }
        } catch (error) {
            overallStatus = new Status(Status.ERROR, 'Error...');
        }
        //Close file reader
        xmlStreamReader.close();

        //Action to take whemn the file is already readed.
        if (overallStatus.getStatus() == Status.OK) {
            fileAction(args.FileAction, filePath, archivePath);
        }
        
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


module.exports.updateOrders = updateOrders;