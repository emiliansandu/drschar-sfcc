'use strict';

/**
 * @namespace Instagram
 */


var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
/* global dw request response empty */

const Site = require('dw/system/Site');
const Transaction = require('dw/system/Transaction');
const CacheMgr = require('dw/system/CacheMgr');
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const ISML = require('dw/template/ISML');
const URLUtils = require('dw/web/URLUtils');

var server = require('server');

server.get('Show', function (req, res, next) {
    var serviceName = 'instagram.http.get';
    var instagramService = LocalServiceRegistry.createService(serviceName, {});
    res.json({ value: instagramService});
    next();
});

module.exports = server.exports();