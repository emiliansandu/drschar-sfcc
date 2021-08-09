'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
/**
 * Render logic for storefront.productTile component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var YotpoIntegrationHelper = require('*/cartridge/scripts/common/integrationHelper.js');

    var content = context.content;
    var productTileParams = { pview: 'tile', pid: context.content.product.ID };
    var product = ProductFactory.get(productTileParams);

    var Locale = URLUtils.home().relative().toString();
    Locale = Locale.split('?lang=');
    Locale = Locale[1];

    var viewData = {
        action: 'Product-Show',
        product:{
            id:''
        },
        locale:Locale
      };
     var productId= context.content.product.ID;
    var productDataReviews = Object.create(viewData);
    productDataReviews.product.id = productId;

    var yotpoViewData = YotpoIntegrationHelper.addRatingsOrReviewsToViewData(viewData);

    //Missing prices
    var params = new Object;
    params.pid = product.id;
    var fullProduct = ProductFactory.get(params);
    product.price.list = fullProduct.price.list;
    product.price.sales = fullProduct.price.sales;

    var productUrl = URLUtils.url('Product-Show', 'pid', product.id).relative().toString();
    var productQuickViewUrl = URLUtils.url('Product-ShowQuickView', 'pid', product.id).relative().toString();

    model.product = product;
    model.display = {
        swatches: true,
        ratings: content.displayRatings
    }
    model.yotpoWidgetData=yotpoViewData.yotpoWidgetData;

    model.urls = {
        product: productUrl,
        quickView: productQuickViewUrl
    };

    return new Template('experience/components/commerce_assets/product/productTile').render(model).text;
};
