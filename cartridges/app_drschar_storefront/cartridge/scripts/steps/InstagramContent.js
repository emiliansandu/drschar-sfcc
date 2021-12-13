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

        if (parameters.CustomObjectApiPath && tokenKey) {
            var apiPath = parameters.CustomObjectApiPath+"&limit=8";
            var instaFeed = instaHelper.getFeed(apiPath, tokenKey);
            if (instaFeed != null) {             
                for(var i=0; i<instaFeed.data.length; i++){         
                saveInstagramContent(instaFeed, i);
            }
            var infoLog = Logger.getLogger("info-insgDataSave", "customjobInstagramTokenInfo");
            infoLog.info("The data has been saved on instagramContent custom object");   
            }
    
        };
    }


};

function saveInstagramContent(instaFeed, i) {  
          
   try {
    var customObjectKeyValueExists = CustomObjectMgr.getCustomObject('instagramContent', i);
    if (!customObjectKeyValueExists) {
       var CustomObject = CustomObjectMgr.createCustomObject('instagramContent', i);
       CustomObject.custom.ID=instaFeed.data[i].id;
       CustomObject.custom.caption=instaFeed.data[i].caption;
       CustomObject.custom.mediaType=instaFeed.data[i].media_type;
       CustomObject.custom.mediaURL=instaFeed.data[i].media_url;
       CustomObject.custom.permalink=instaFeed.data[i].permalink;
       CustomObject.custom.thumbnailURL=instaFeed.data[i].thumbnail_url;
    } else{
       customObjectKeyValueExists.custom.ID=instaFeed.data[i].id;
       customObjectKeyValueExists.custom.caption=instaFeed.data[i].caption;
       customObjectKeyValueExists.custom.mediaType=instaFeed.data[i].media_type;
       customObjectKeyValueExists.custom.mediaURL=instaFeed.data[i].media_url;
       customObjectKeyValueExists.custom.permalink=instaFeed.data[i].permalink;
       customObjectKeyValueExists.custom.thumbnailURL=instaFeed.data[i].thumbnail_url;
    }    
    } catch (e) {
        var errorLog = Logger.getLogger("error-insgDataSave", "customjobInstagramTokenInfo");
            errorLog.error("The data could not been saved in instagramContent custom object");
      }
}
