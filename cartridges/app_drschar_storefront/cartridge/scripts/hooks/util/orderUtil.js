'use strict';

var ContentMgr = require('dw/content/ContentMgr');
var URLUtils = require('dw/web/URLUtils');
var ClickStreamEntry = require('dw/web/ClickStreamEntry');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

module.exports.getHost = function () {
    var host = URLUtils.httpHome().toString();
    host = host.split('/s/');
    host = host[0].split('//');
    host = host[1];
    return host;
};

module.exports.getLocale = function () {
    var Locale = URLUtils.home().relative().toString();
    Locale = Locale.split('?lang=');
    Locale = Locale[1];
    return Locale;
};

module.exports.getContentAsset = function () {
    var locateStoreAsset = ContentMgr.getContent('footer-locate-store');
    var accountAsset = ContentMgr.getContent('footer-account');
    var supportAsset = ContentMgr.getContent('footer-support');
    var aboutUsAsset = ContentMgr.getContent('footer-about');

    var contentAsset = { locateStoreAsset: locateStoreAsset, accountAsset: accountAsset, supportAsset: supportAsset, aboutUsAsset: aboutUsAsset};
    
    return contentAsset;
};
