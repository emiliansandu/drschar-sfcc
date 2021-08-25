'use strict';

var ContentMgr = require('dw/content/ContentMgr');
var URLUtils = require('dw/web/URLUtils');
var ClickStreamEntry = require('dw/web/ClickStreamEntry');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

module.exports.getContentAsset = function () {
    var locateStoreAsset = ContentMgr.getContent('footer-locate-store');
    var accountAsset = ContentMgr.getContent('footer-account');
    var supportAsset = ContentMgr.getContent('footer-support');
    var aboutUsAsset = ContentMgr.getContent('footer-about');

    var contentAsset = { locateStoreAsset: locateStoreAsset, accountAsset: accountAsset, supportAsset: supportAsset, aboutUsAsset: aboutUsAsset};
    
    return contentAsset;
};
