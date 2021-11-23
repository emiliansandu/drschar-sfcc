'use strict';

/**
 * @namespace Tile
 */
var page = module.superModule;
var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');

server.extend(page);
/**
 * Tile-Show : Used to return data for rendering a product tile
 * @name Base/Tile-Show
 * @function
 * @memberof Tile
 * @param {middleware} - cache.applyPromotionSensitiveCache
 * @param {querystringparameter} - pid - the Product ID
 * @param {querystringparameter} - ratings - boolean to determine if the reviews should be shown in the tile
 * @param {querystringparameter} - swatches - boolean to determine if the swatches should be shown in the tile
 * @param {querystringparameter} - pview - string to determine if the product factory returns a model for a tile or a pdp/quickview display
 * @param {querystringparameter} - quantity - Quantity
 * @param {querystringparameter} - dwvar_<pid>_color - Color Attribute ID
 * @param {querystringparameter} - dwvar_<pid>_size - Size Attribute ID
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append('Show', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    // The req parameter has a property called querystring. In this use case the querystring could
    // have the following:
    // pid - the Product ID
    // ratings - boolean to determine if the reviews should be shown in the tile.
    // swatches - boolean to determine if the swatches should be shown in the tile.
    //
    // pview - string to determine if the product factory returns a model for
    //         a tile or a pdp/quickview display
    var productTileParams = { pview: 'tile' };
    Object.keys(req.querystring).forEach(function (key) {
        productTileParams[key] = req.querystring[key];
    });

    var product;
    var productUrl;
    var quickViewUrl;

    // TODO: remove this logic once the Product factory is
    // able to handle the different product types
    try {
        product = ProductFactory.get(productTileParams);
        productUrl = URLUtils.url('Product-Show', 'pid', product.id).relative().toString();
        quickViewUrl = URLUtils.url('Product-ShowQuickView', 'pid', product.id)
            .relative().toString();
        //Missing prices
        var params = new Object;
        params.pid = product.id;
        var fullProduct = ProductFactory.get(params);
        product.price.list = fullProduct.price.list;
        product.price.sales = fullProduct.price.sales;
        product.isNew = fullProduct.isNew;
        product.isAvailable = productHelper.verifyAvailability(fullProduct.availability.messages);
    } catch (e) {
        product = false;
        productUrl = URLUtils.url('Home-Show');// TODO: change to coming soon page
        quickViewUrl = URLUtils.url('Home-Show');
    }

    var context = {
        product: product,
        urls: {
            product: productUrl,
            quickView: quickViewUrl
        },
        display: {}
    };

    Object.keys(req.querystring).forEach(function (key) {
        if (req.querystring[key] === 'true') {
            context.display[key] = true;
        } else if (req.querystring[key] === 'false') {
            context.display[key] = false;
        }
    });

    res.render('product/gridTile.isml', context);

    next();
});

server.get('ShowRecomended', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var product;
    var params = new Object;

    try {
        params.pid = req.querystring.pid;
        product = ProductFactory.get(params);
    } catch (e) {
        product = false;
    }

    var context = {
        product: product,
    };

    res.render('product/recomendedTile.isml', context);

    next();
});


module.exports = server.exports();
