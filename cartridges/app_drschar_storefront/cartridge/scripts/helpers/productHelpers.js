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

    var productObj = {
        "id": product.id,
        "name": product.productName,
        "brand": brand,
        "category": categories,
        "quantity": product.selectedQuantity,
        "price": product.price.sales.value
    }

    if (variants && variants!="") {
        productObj.variant = variants;
    }

    return productObj;
}

PHelper.builderObject = function builderObject(order, querystring, pageMetaData){
    var orderNum = order.orderNo;
    var total = order.totalNetPrice.value;
    var currency = order.totalNetPrice.currencyCode;
    var tax = order.totalTax.value;
    var shippingCost = order.shippingTotalPrice.value;
    var params = new Object; 
    var items = PHelper.getProductItems(order.productLineItems,params);
    var finalObj = {
        "transaction_id": orderNum,
        "affiliation": "Google online store",
        "value": total,
        "currency": currency,
        "tax": tax,
        "shipping": shippingCost,
        "items": items
    };
    return finalObj;    
}

PHelper.getProductItems = function getProductItems(allProducts,params) {
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var items = new Array;
    for (var i = 0; i < allProducts.length; i++) {
        params.pid = allProducts[i].productID;
        var product = ProductFactory.get(params);
        var breadcrumb = PHelper.getAllBreadcrumbs(null, product.id, []).reverse();
        var productType = product.productType;
        if (!product.online && productType !== 'set' && productType !== 'bundle') {
            res.setStatusCode(404);
        } else {
            var productData = PHelper.getObjectItems(product,breadcrumb);
            productData.list_position = i+1;                      
            productData.quantity = allProducts[i].quantity.value;
            items.push(productData);
        }
    }

    return items;
}

PHelper.addUnitToBundleChilds = function addUnitToBundleChilds (showProductPageHelperResult){
    var ProductMgr = require('dw/catalog/ProductMgr');
    var childs = showProductPageHelperResult.product.bundledProducts;
    for (var i = 0; i < childs.length; i++) {
        var pid = childs[i].id;
        var fullChild = ProductMgr.getProduct(pid);
        childs[i].unit = fullChild.unit;
    }
    return showProductPageHelperResult;
}

PHelper.verifyAvailability = function verifyAvailability(object){
    var status = true;
    for (var key in object) {
        if (object[key] == 'In Stock') {
            status = true;
        }else{
            status = false;
        }
    }
    return status;
}

PHelper.showProductPage = function showProductPage(querystring, reqPageMetaData) {
    var URLUtils = require('dw/web/URLUtils');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    var params = querystring;
    var product = ProductFactory.get(params);
    var addToCartUrl = URLUtils.url('Cart-AddProduct');
    var canonicalUrl = URLUtils.url('Product-Show', 'pid', product.id);
    var breadcrumbs = PHelper.getAllBreadcrumbs(null, product.id, []).reverse();

    var template = 'product/productDetails';

    if (product.productType === 'bundle' && !product.template) {
        template = 'product/bundleDetails';
    } else if (product.productType === 'set' && !product.template) {
        template = 'product/setDetails';
    } else if (product.isCustomBundle) {
        buildBundledProducts(product,params);
        template = 'product/customBundleDetails';
    } else if (product.template) {
        template = product.template;
    }

    pageMetaHelper.setPageMetaData(reqPageMetaData, product);
    pageMetaHelper.setPageMetaTags(reqPageMetaData, product);
    var schemaData = require('*/cartridge/scripts/helpers/structuredDataHelper').getProductSchema(product);

    return {
        template: template,
        product: product,
        addToCartUrl: addToCartUrl,
        resources: PHelper.getResources(),
        breadcrumbs: breadcrumbs,
        canonicalUrl: canonicalUrl,
        schemaData: schemaData
    };
}

function buildBundledProducts(product,params) {
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var bundleds = product.customBundleProductsId;
    if (bundleds.length > 0) {
        var bundledProducts = new Array;
        product.bundledProducts = bundledProducts;
        for (var i = 0; i < bundleds.length; i++) {
            params.pid = bundleds[i];
            var childProduct = ProductFactory.get(params);
            if(childProduct != null){
                bundledProducts.push(childProduct);
            }
        }
    }
}

module.exports = PHelper;
