'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var urlHelper = require('*/cartridge/scripts/helpers/urlHelpers');

var PHelper = module.superModule;

PHelper.getCategories = function getCategories(breadcrumbs){
    var category='';
    for (var i in breadcrumbs) {
        category+=breadcrumbs[i].htmlValue+'/';    
    }
    var categories = category.slice(0,-1);
    return categories;
}

PHelper.getVariants = function getVariants(variants){
    var text='';
    for (var i in variants) {
        var childs = variants[i].values;
        if(childs){
            text += variants[i].displayName+':';
            for(var j in childs){
                text += childs[j].displayValue+',';
            }
        }
        else{
            text += 'none,'
        }
    }
    var variants = text.slice(0,-1);
    return variants;
}

module.exports = PHelper;
