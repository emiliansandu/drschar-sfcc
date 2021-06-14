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
    if(variants){
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
    }else{
        return '';
    }
    
    var variantsCad = text.slice(0,-1);
    return variantsCad;
}

PHelper.getObjectItems = function getObjectItems(product,breadcrumb){
    var categories = PHelper.getCategories(breadcrumb);
    var variants = PHelper.getVariants(product.variationAttributes);
    var brand = product.brand == null ? '' : product.brand;
    var price = product.price.sales == undefined ? product.price.min.sales.value : product.price.sales.value;

    if (variants && variants!="") {
        return {
            "items": [
              {
                "id": product.id,
                "name": product.productName,
                "brand": brand,
                "category": categories,
                "variant": variants,
                "quantity": product.selectedQuantity,
                "price": price
              }
            ]
        };
    }

    return  {
        "items": [
          {
            "id": product.id,
            "name": product.productName,
            "brand": brand,
            "category": categories,
            "quantity": product.selectedQuantity,
            "price": product.price.sales.value
          }
        ]
    };
}

module.exports = PHelper;
