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
        value: apiProduct.custom.gcGlutenFree
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
            for(var j=0; j<attributeDefinitionAllergyInf.length; j++){
                 var valor=apiProduct.custom[attributeDefinitionAllergyInf[j].ID];
                Object.defineProperty(object, attributeDefinitionAllergyInf[j].ID, {
                    enumerable: true,
                    value: {value: valor , name: attributeDefinitionAllergyInf[j].displayName, groupName: groupName, groupId: groupId}
                });
            }
        }
    }
    
   /* Object.defineProperty(object, 'beechNutFree', {
        enumerable: true,
        value: apiProduct.custom.beechNutFree
    });
    Object.defineProperty(object, 'brazilNutFree', {
        enumerable: true,
        value: apiProduct.custom.brazilNutFree
    });
    Object.defineProperty(object, 'butternutFree', {
        enumerable: true,
        value: apiProduct.custom.butternutFree
    });
    Object.defineProperty(object, 'cashewFree', {
        enumerable: true,
        value: apiProduct.custom.cashewFree
    });
    Object.defineProperty(object, 'chesnutFree', {
        enumerable: true,
        value: apiProduct.custom.chesnutFree
    });
    Object.defineProperty(object, 'chinquapinFree', {
        enumerable: true,
        value: apiProduct.custom.chinquapinFree
    });
    Object.defineProperty(object, 'clubWheatFree', {
        enumerable: true,
        value: apiProduct.custom.clubWheatFree
    });
    Object.defineProperty(object, 'coconutFree', {
        enumerable: true,
        value: apiProduct.custom.coconutFree
    });
    Object.defineProperty(object, 'crustaceansFree', {
        enumerable: true,
        value: apiProduct.custom.crustaceansFree
    });
    Object.defineProperty(object, 'durumWheatFree', {
        enumerable: true,
        value: apiProduct.custom.durumWheatFree
    });
    Object.defineProperty(object, 'eggFree', {
        enumerable: true,
        value: apiProduct.custom.eggFree
    });
    Object.defineProperty(object, 'einkornFree', {
        enumerable: true,
        value: apiProduct.custom.einkornFree
    });
    Object.defineProperty(object, 'emmerFree', {
        enumerable: true,
        value: apiProduct.custom.emmerFree
    });
    Object.defineProperty(object, 'filberHazelnutFree', {
        enumerable: true,
        value: apiProduct.custom.filberHazelnutFree
    });
    Object.defineProperty(object, 'fishFree', {
        enumerable: true,
        value: apiProduct.custom.fishFree
    });
    Object.defineProperty(object, 'gincoNutFree', {
        enumerable: true,
        value: apiProduct.custom.gincoNutFree
    });
    Object.defineProperty(object, 'glutenFree', {
        enumerable: true,
        value: apiProduct.custom.glutenFree
    });
    Object.defineProperty(object, 'hickoryNutFree', {
        enumerable: true,
        value: apiProduct.custom.hickoryNutFree
    });
    Object.defineProperty(object, 'kamutFree', {
        enumerable: true,
        value: apiProduct.custom.kamutFree
    });
    Object.defineProperty(object, 'licheeNutFree', {
        enumerable: true,
        value: apiProduct.custom.licheeNutFree
    });
    Object.defineProperty(object, 'lupineFree', {
        enumerable: true,
        value: apiProduct.custom.lupineFree
    });
    Object.defineProperty(object, 'macadamiaNutFree', {
        enumerable: true,
        value: apiProduct.custom.macadamiaNutFree
    });
    Object.defineProperty(object, 'milkFree', {
        enumerable: true,
        value: apiProduct.custom.milkFree
    });
    Object.defineProperty(object, 'otherTreeNutsFree', {
        enumerable: true,
        value: apiProduct.custom.otherTreeNutsFree
    });
    Object.defineProperty(object, 'peanutsFree', {
        enumerable: true,
        value: apiProduct.custom.peanutsFree
    });
    Object.defineProperty(object, 'pecanFree', {
        enumerable: true,
        value: apiProduct.custom.pecanFree
    });
    Object.defineProperty(object, 'pineNutFree', {
        enumerable: true,
        value: apiProduct.custom.pineNutFree
    });
    Object.defineProperty(object, 'pistachioFree', {
        enumerable: true,
        value: apiProduct.custom.pistachioFree
    });
    Object.defineProperty(object, 'semolinaFree', {
        enumerable: true,
        value: apiProduct.custom.semolinaFree
    });
    Object.defineProperty(object, 'sheanutFree', {
        enumerable: true,
        value: apiProduct.custom.sheanutFree
    });
    Object.defineProperty(object, 'shellfisFree', {
        enumerable: true,
        value: apiProduct.custom.shellfisFree
    });
    Object.defineProperty(object, 'soyFree', {
        enumerable: true,
        value: apiProduct.custom.soyFree
    });
    Object.defineProperty(object, 'treeNutsFree', {
        enumerable: true,
        value: apiProduct.custom.treeNutsFree
    });
    Object.defineProperty(object, 'triticaleFree', {
        enumerable: true,
        value: apiProduct.custom.triticaleFree
    });
    Object.defineProperty(object, 'walnutFree', {
        enumerable: true,
        value: apiProduct.custom.walnutFree
    });
    Object.defineProperty(object, 'wheatFree', {
        enumerable: true,
        value: apiProduct.custom.wheatFree
    });
    Object.defineProperty(object, 'allergyContains', {
        enumerable: true,
        value: apiProduct.custom.allergyContains
    });
    Object.defineProperty(object, 'allergyMayContain', {
        enumerable: true,
        value: apiProduct.custom.allergyMayContain
    });*/
   
};
