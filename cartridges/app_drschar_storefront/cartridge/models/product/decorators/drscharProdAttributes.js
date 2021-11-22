'use strict';

module.exports = function (object, apiProduct) {
    //here we define attrGroups variable for use when need to get attribute names for our Product System Object Custom attributes  
    var attrGroups = apiProduct.attributeModel.attributeGroups;
    
    //Product custom attributes asigned to generalInformation group
    var str = apiProduct.custom.videoMedia;
    var videoMediaEmbed;
    if (str) {
        if (str.indexOf('https://youtu.be/') !== -1) {
            videoMediaEmbed = str.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
        }else if (str.indexOf('http://youtu.be/') !== -1) {
            videoMediaEmbed = str.replace('http://youtu.be/', 'https://www.youtube.com/embed/');
        }
        else if (str.indexOf('https://www.youtube.com/v/') !== -1) {
            videoMediaEmbed = str.replace('https://www.youtube.com/v/', 'https://www.youtube.com/embed/');
        } 
        else if (str.indexOf('http://www.youtube.com/v/') !== -1) {
            videoMediaEmbed = str.replace('http://www.youtube.com/v/', 'https://www.youtube.com/embed/');
        } else if (str.indexOf('https://www.youtube.com/watch?v=') !== -1) {
            videoMediaEmbed = str.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
        }
        else if (str.indexOf('http://www.youtube.com/watch?v=') !== -1) {
            videoMediaEmbed = str.replace('http://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
        }
    }

    Object.defineProperty(object, 'videoMedia', {
        enumerable: true,
        value: videoMediaEmbed
    });
    Object.defineProperty(object, 'gcGlutenFree', {
        enumerable: true,
        value: apiProduct.custom.gcGlutenFree
    });
    Object.defineProperty(object, 'gcWheatFree', {
        enumerable: true,
        value: apiProduct.custom.gcWheatFree
    });
    Object.defineProperty(object, 'gcDairyFree', {
        enumerable: true,
        value: apiProduct.custom.gcDairyFree
    });
    Object.defineProperty(object, 'gcLactoseFree', {
        enumerable: true,
        value: apiProduct.custom.gcLactoseFree
    });
    Object.defineProperty(object, 'gcNonGMO', {
        enumerable: true,
        value: apiProduct.custom.gcNonGMO
    });
    Object.defineProperty(object, 'isNew', {
        enumerable: true,
        value: apiProduct.custom.isNew
    });
    Object.defineProperty(object, 'gcPreservativeFree', {
        enumerable: true,
        value: apiProduct.custom.gcPreservativeFree
    });
    Object.defineProperty(object, 'textClaim', {
        enumerable: true,
        value: apiProduct.custom.textClaim
    });
 //Product custom attributes asigned to allergyInformation group
    for (var i=0; i<attrGroups.length; i++){
        if(attrGroups[i].ID=='allergyInformation'){
            var groupName=attrGroups[i].displayName;
            var groupId=attrGroups[i].ID;
            var attributeDefinitionAllergyInf=attrGroups[i].attributeDefinitions;
            var newArr =new Array();
            Object.defineProperty(object, 'allergyGroupProperties', {
                enumerable: true,
                value: {groupName: groupName, groupId: groupId, contentProperties:newArr}
            });
            for(var j=0; j<attributeDefinitionAllergyInf.length; j++){
                 var attributeDefinitionValue=apiProduct.custom[attributeDefinitionAllergyInf[j].ID];
                object.allergyGroupProperties.contentProperties.push({value:attributeDefinitionValue, name: attributeDefinitionAllergyInf[j].displayName, id: attributeDefinitionAllergyInf[j].ID});
            }
        }
    }  
};
