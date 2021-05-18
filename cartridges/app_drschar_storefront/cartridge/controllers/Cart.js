'use strict';

/**
 * @namespace Cart
 */
var page = module.superModule;
var server = require('server');


var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var Site = require('dw/system/Site');

server.extend(page);

server.append(
    'Show',
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function (req, res, next) {
        var Resource = require('dw/web/Resource');

        var viewData = res.getViewData();

        if(viewData.numItems>0){
            var orderMinimum=Site.current.getCustomPreferenceValue('orderMinimumThresholdAmount');
            var subTotal=Number(viewData.totals.subTotal.slice(1));
            if(subTotal<orderMinimum){
                res.setViewData({
                    orderMinimumNotCompleted:true,
                    orderMinimumMessage:Resource.msg('error.cart.orderMinimumThresholdAmount', 'cart', null)
                });
            }
        }
        next();
    }
);

/**
 * Cart-UpdateQuantity : The Cart-UpdateQuantity endpoint handles updating the quantity of a product line item in the basket
 * @name Base/Cart-UpdateQuantity
 * @function
 * @memberof Cart
 * @param {querystringparameter} - pid - the product id
 * @param {querystringparameter} - quantity - the quantity to be updated for the line item
 * @param {querystringparameter} -  uuid - the universally unique identifier of the product object
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - get
 */
 server.append('UpdateQuantity', function (req, res, next) {
    var Resource = require('dw/web/Resource');

    var viewData = res.getViewData();

    if(viewData.numItems>0){
        var orderMinimum=Site.current.getCustomPreferenceValue('orderMinimumThresholdAmount');
        var subTotal=Number(viewData.totals.subTotal.slice(1));
        if(subTotal<orderMinimum){
            res.setViewData({
                orderMinimumNotCompleted:true,
                //orderMinimumMessage:Resource.msg('error.cart.orderMinimumThresholdAmount', 'cart', null)
               orderMinimumMessage:Resource.msg('error.cart.orderMinimumThresholdAmount', 'cart', null)+' '+Number(orderMinimum).toFixed(2) 
            });
        }
    }
    
    return next();
});

module.exports = server.exports();