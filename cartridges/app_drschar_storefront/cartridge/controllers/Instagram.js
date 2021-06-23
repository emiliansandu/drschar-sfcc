'use strict';

/**
 * @namespace Instagram
 */

var server = require('server');
/* global dw request response empty */
var instagramService = require('~/cartridge/scripts/service/instagramService');

server.get('Show', server.middleware.https, function (req, res, next) {
    var sHttpRes = instagramService.generateShttp();
    res.json(sHttpRes);
    return next();
});
module.exports = server.exports();