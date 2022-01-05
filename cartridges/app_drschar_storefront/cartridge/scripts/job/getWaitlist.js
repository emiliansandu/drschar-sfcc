'use strict';

/**
 * Gets custom objects for product waitilist and trigger email send to customers in waitlist
 */

function execute() {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Logger = require('dw/system/Logger');
    var ArrayList = require('dw/util/ArrayList');
    var allProductsWaitlist = CustomObjectMgr.getAllCustomObjects('Waitlist');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var transaction = require('dw/system/Transaction');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');
    var ContentMgr = require('dw/content/ContentMgr');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var emailList;
    var product;
    var items;
    var emails = new ArrayList();
    var locateStoreAsset = ContentMgr.getContent('footer-locate-store');
    var accountAsset = ContentMgr.getContent('footer-account');
    var supportAsset = ContentMgr.getContent('footer-support');
    var aboutUsAsset = ContentMgr.getContent('footer-about');
    var contentAsset = { locateStoreAsset: locateStoreAsset, accountAsset: accountAsset, supportAsset: supportAsset, aboutUsAsset: aboutUsAsset};

    function sendEmail(emailList , item, productImage, contentAsset){
        var emailObjConfirmation = {
            to: emailList,
            subject: Resource.msgf(
                'backStock.email.subject',
                'backInStock-email',
                null
            ),
            from: 'no-reply@drschar.com',
            type: emailHelpers.emailTypes.offer
        };
        try {
            emailHelpers.sendEmail(
                emailObjConfirmation,
                'emails/backInstock/stockEmail',
                {
                    item: item,
                    productImage: productImage,
                    contentAsset: contentAsset
                }
            );
        } catch (error) {
            Logger.error(
                'Houston we have a problem', error
            );
        }
    }

    function removeProduct(product) {
        transaction.wrap(function () {
            CustomObjectMgr.remove(product);
        });
    }

    while (allProductsWaitlist.hasNext()) {
        items = allProductsWaitlist.next();
        product = ProductMgr.getProduct(items.custom.productId); 
        var params={lang:'',pid:''};
        params.pid=items.custom.productId;
        var Locale = URLUtils.home().relative().toString();
        Locale = Locale.split('?lang=');
        Locale = Locale[1];
        params.lang=Locale;
        var productObject = ProductFactory.get(params);
        var productImage=productObject.images.small[0];        
        if (product !== null) {
            if (items.custom.productId === product.ID) {
                if (product.availabilityModel.inStock === true) {
                    emailList = items.custom.emails;
                    if (emailList.length != 0) {
                        for (var a = 0; a < emailList.length; a++) {
                            emails.add(emailList[a]);
                            sendEmail(emails[a], product, productImage, contentAsset);
                        }
                    } else {
                        emails.add(emailList[0]);
                    }
                    removeProduct(items);
                }
            }
        } else {
            Logger.error(
                'Product with ID {0} does not exist',
                items.custom.productId
            );
        }
    }
}
module.exports = {
    execute: execute
};
