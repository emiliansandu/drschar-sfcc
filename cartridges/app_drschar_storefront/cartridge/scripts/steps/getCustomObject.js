'use strict';

//var server = require('server');
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
    getCOs : function getCOs(parameters) {
        
        var CustomObjectInstance = CustomObjectMgr.getAllCustomObjects('instagramToken');
        var CustomObjectCount=CustomObjectInstance.getCount();
        var CustomObjectData=CustomObjectInstance.asList(0, CustomObjectCount);
          var tokenKey=CustomObjectData[0].custom.tokenKey;

                if (parameters.CustomObjectType && tokenKey) {  
                var apiPath="refresh_access_token?grant_type=ig_refresh_token";  
                var instaFeed = instaHelper.getFeed(apiPath, tokenKey);
                var infoLog = Logger.getLogger("info-insgTokenRefresh", "customjobInstagramTokenInfo");
                infoLog.info("The token "+instaFeed.access_token+" now expires in "+instaFeed.expires_in+" seconds");    
                };
            }
        
        };