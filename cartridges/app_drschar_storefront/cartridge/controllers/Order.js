var server = require('server');
var page = module.superModule;
server.extend(page);
/*Email test is an endpoint created in this controller to test
 of mailing of cancellation purchase orders without having to capture an order every time we make a change*/
 server.get('EmailTest', function(req, res, next) {
    var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
    var OrderMgr = require('dw/order/OrderMgr');//necesario para que jale
    
    var paymentMgr = require('dw/order/PaymentMgr');
    var ContentMgr = require('dw/content/ContentMgr');
    
    var locateStoreAsset = ContentMgr.getContent('footer-locate-store');
    var accountAsset = ContentMgr.getContent('footer-account');
    var supportAsset = ContentMgr.getContent('footer-support');
    var aboutUsAsset = ContentMgr.getContent('footer-about');

    var contentAsset = { locateStoreAsset: locateStoreAsset, accountAsset: accountAsset, supportAsset: supportAsset, aboutUsAsset: aboutUsAsset};

    var orderid = '00001303';//put here number of an existing order to be canceled
    var paymentid='CREDIT_CARD'//put here payment method used for the order
    var paymentObject=paymentMgr.getPaymentMethod(paymentid);
    var order = OrderMgr.getOrder(orderid);
    var productQuantities=order.productQuantities;
    var productWeight=productQuantities.keySet();                                 
                                               
    COHelpers.sendCancellationEmail(order, req.locale.id, req.host, paymentObject, contentAsset, productWeight);//necesario para que jale aunque solo se ocupan estos parametros: order, req.locale.id
    res.json({ value: 'Order: '+orderid+' has been canceled'});
    next();
});

module.exports = server.exports();