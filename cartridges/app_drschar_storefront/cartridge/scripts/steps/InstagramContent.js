'use strict';

var Logger = require('dw/system/Logger');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var instaHelper = require('~/cartridge/scripts/helpers/instagramHelper');

/**
 * @function getCOs
 * @description Function that gets a custom object for a CO type and key attribute passed as a parameter.
 *
 * @param {Object} parameters Represents the parameters defined in the steptypes.json file
 */
module.exports = {
    getInstagramContent: function getInstagramContent(parameters) {

        var CustomObjectInstance = CustomObjectMgr.getAllCustomObjects('instagramToken');
        var CustomObjectCount = CustomObjectInstance.getCount();
        var CustomObjectData = CustomObjectInstance.asList(0, CustomObjectCount);
        var tokenKey = CustomObjectData[0].custom.tokenKey;

        if (tokenKey) {
            var apiPath = "me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&limit=8";
            var instaFeed = instaHelper.getFeed(apiPath, tokenKey);
            if (instaFeed != null) {
                saveInstagramContent(instaFeed);
            }
            infoLog.info("The data is saved in a custom object");
        };
    }


};

function saveInstagramContent(instaFeed) {
    var CustomObjectInstance = CustomObjectMgr.getAllCustomObjects('instagramContent');
    var CustomObjectCount = CustomObjectInstance.getCount();
    var CustomObjectData = CustomObjectInstance.asList(0, CustomObjectCount);
    CustomObjectData[0].custom.data = instaFeed;
}