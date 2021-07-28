'use strict';

/**
 * @namespace Product
 */

var server = require('server');
var Resource = require('dw/web/Resource');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
const CustomObjectMgr = require('dw/object/CustomObjectMgr');

/**
 * @typedef ProductDetailPageResourceMap
 * @type Object
 * @property {String} global_availability - Localized string for "Availability"
 * @property {String} label_instock - Localized string for "In Stock"
 * @property {String} global_availability - Localized string for "This item is currently not
 *     available"
 * @property {String} info_selectforstock - Localized string for "Select Styles for Availability"
 */

  /**
  * Product-Show : This endpoint is called to show the details of the selected product
  * @name Base/Product-Show
  * @function
  * @memberof Product
  * @param {middleware} - cache.applyPromotionSensitiveCache
  * @param {middleware} - consentTracking.consent
  * @param {querystringparameter} - pid - Product ID
  * @param {category} - non-sensitive
  * @param {renders} - isml
  * @param {serverfunction} - get
  */
server.get('Show', cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var fullProduct = ProductMgr.getProduct(req.querystring.pid);
    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
    var productType = showProductPageHelperResult.product.productType;
    var NutritionalFactsObj = CustomObjectMgr.queryCustomObject('NutritionFacts','custom.productID = {0}', fullProduct.ID) || null;
    var NutFactData = {calories: '', cholesterol: '', cholesterol_percent: '', fiber: '', fiber_percent: '',protein: '', protein_percent: '',
        satFat: '', satFat_percent: '', servingPerContainer: '', servingSize: '', sodium: '', sodium_percent: '', sugars: '', sugars_percent: '',
        transFat: '', totalCarb: '', totalCarb_percent: '', totalFat: '', totalFat_percent: '',totalSugars: '', NutritionColumn: []
    }
    var fact = { propName: '', propVal1: '', propVal2: ''};

    const addToNutritionCol = function(Name, propVal, propPercent) {
        fact = {
            propName: Name,
            propVal1: propVal,
            propVal2: calcNutritionPercent(propPercent)
        }
        NutFactData.NutritionColumn.push(fact);
    }

    const calcNutritionPercent = function (proPercent){
        if (proPercent) {
            var calcpercent = Math.round( parseFloat(proPercent) * 100 );
            var percent = calcpercent + '%';
            return percent;
        }
        else{
            return ''
        }
    }

    if (NutritionalFactsObj) {
            NutFactData.calories = NutritionalFactsObj.custom.calories;
            NutFactData.cholesterol = NutritionalFactsObj.custom.cholesterol;
            NutFactData.cholesterol_percent = calcNutritionPercent(NutritionalFactsObj.custom.cholesterol_percent);
            NutFactData.fiber = NutritionalFactsObj.custom.fiber;
            NutFactData.fiber_percent = calcNutritionPercent(NutritionalFactsObj.custom.fiber_percent);
            NutFactData.protein = NutritionalFactsObj.custom.protein;
            NutFactData.protein_percent = calcNutritionPercent(NutritionalFactsObj.custom.protein_percent);
            NutFactData.satFat = NutritionalFactsObj.custom.satFat;
            NutFactData.satFat_percent = calcNutritionPercent(NutritionalFactsObj.custom.satFat_percent);
            NutFactData.servingPerContainer = NutritionalFactsObj.custom.servingPerContainer;
            NutFactData.servingSize = NutritionalFactsObj.custom.servingSize;
            NutFactData.sodium = NutritionalFactsObj.custom.sodium;
            NutFactData.sodium_percent = calcNutritionPercent(NutritionalFactsObj.custom.sodium_percent );
            NutFactData.sugars = NutritionalFactsObj.custom.sugars;
            NutFactData.sugars_percent = calcNutritionPercent(NutritionalFactsObj.custom.sugars_percent);
            NutFactData.transFat = NutritionalFactsObj.custom.transFat;
            NutFactData.totalCarb = NutritionalFactsObj.custom.totalCarb;
            NutFactData.totalCarb_percent = calcNutritionPercent(NutritionalFactsObj.custom.totalCarb_percent);
            NutFactData.totalFat = NutritionalFactsObj.custom.totalFat;
            NutFactData.totalFat_percent = calcNutritionPercent(NutritionalFactsObj.custom.totalFat_percent);
            NutFactData.totalSugars = NutritionalFactsObj.custom.totalSugars;
        
        if (NutritionalFactsObj.custom.calcium && NutritionalFactsObj.custom.calcium_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.calcium', 'product', null), NutritionalFactsObj.custom.calcium, NutritionalFactsObj.custom.calcium_percent);
        }

        if (NutritionalFactsObj.custom.iron && NutritionalFactsObj.custom.iron_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.iron', 'product', null), NutritionalFactsObj.custom.iron, NutritionalFactsObj.custom.iron_percent);
        }
    
        if (NutritionalFactsObj.custom.niacin && NutritionalFactsObj.custom.niacin_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.niacin', 'product', null), NutritionalFactsObj.custom.niacin, NutritionalFactsObj.custom.niacin_percent);
        }

        if (NutritionalFactsObj.custom.potassium && NutritionalFactsObj.custom.potassium_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.potassium', 'product', null), NutritionalFactsObj.custom.potassium, NutritionalFactsObj.custom.potassium_percent);
        }

        if (NutritionalFactsObj.custom.riboflavin && NutritionalFactsObj.custom.riboflavin_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.riboflavin', 'product', null), NutritionalFactsObj.custom.riboflavin, NutritionalFactsObj.custom.riboflavin_percent);
        }

        if (NutritionalFactsObj.custom.thiamin && NutritionalFactsObj.custom.thiamin_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.thiamin', 'product', null), NutritionalFactsObj.custom.thiamin, NutritionalFactsObj.custom.thiamin_percent);
        }
    
        if (NutritionalFactsObj.custom.vitaminD && NutritionalFactsObj.custom.vitaminD_percent) {
            addToNutritionCol(Resource.msg('label.tab.nutrition.vitaminD', 'product', null), NutritionalFactsObj.custom.vitaminD, NutritionalFactsObj.custom.vitaminD_percent);
        }

        if (NutFactData.NutritionColumn.length == 0){
            NutFactData.NutritionColumn = null
        }
    }else(NutFactData = null)

    if (productType == 'bundle') {
        productHelper.addUnitToBundleChilds(showProductPageHelperResult);
    }
    if (!showProductPageHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
        res.setStatusCode(404);
        res.render('error/notFound');
    } else {
        var pageLookupResult = productHelper.getPageDesignerProductPage(showProductPageHelperResult.product);

        if ((pageLookupResult.page && pageLookupResult.page.hasVisibilityRules()) || pageLookupResult.invisiblePage) {
            // the result may be different for another user, do not cache on this level
            // the page itself is a remote include and can still be cached
            res.cachePeriod = 0; // eslint-disable-line no-param-reassign
        }
        if (pageLookupResult.page) {
            res.page(pageLookupResult.page.ID, {}, pageLookupResult.aspectAttributes);
        } else {
            res.render(showProductPageHelperResult.template, {
                product: showProductPageHelperResult.product,
                addToCartUrl: showProductPageHelperResult.addToCartUrl,
                resources: showProductPageHelperResult.resources,
                breadcrumbs: showProductPageHelperResult.breadcrumbs,
                canonicalUrl: showProductPageHelperResult.canonicalUrl,
                schemaData: showProductPageHelperResult.schemaData,
                EAN:fullProduct.EAN,
                ingredients:fullProduct.custom.ingredients,
                NutritionFacts: NutFactData
            });
        }
    }
    next();
}, pageMetaData.computedPageMetaData);

server.append('Show', function (req, res, next) {
    var YotpoIntegrationHelper = require('*/cartridge/scripts/common/integrationHelper.js');
    var viewData = YotpoIntegrationHelper.addRatingsOrReviewsToViewData(res.getViewData());
    res.setViewData(viewData);

    next();
});

/**
 * Product-ShowInCategory : The Product-ShowInCategory endpoint renders the product detail page within the context of a category
 * @name Base/Product-ShowInCategory
 * @function
 * @memberof Product
 * @param {middleware} - cache.applyPromotionSensitiveCache
 * @param {querystringparameter} - pid - Product ID
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('ShowInCategory', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
    if (!showProductPageHelperResult.product.online) {
        res.setStatusCode(404);
        res.render('error/notFound');
    } else {
        res.render(showProductPageHelperResult.template, {
            product: showProductPageHelperResult.product,
            addToCartUrl: showProductPageHelperResult.addToCartUrl,
            resources: showProductPageHelperResult.resources,
            breadcrumbs: showProductPageHelperResult.breadcrumbs
        });
    }
    next();
});

/**
 * Product-Variation : This endpoint is called when all the product variants are selected
 * @name Base/Product-Variation
 * @function
 * @memberof Product
 * @param {querystringparameter} - pid - Product ID
 * @param {querystringparameter} - quantity - Quantity
 * @param {querystringparameter} - dwvar_<pid>_color - Color Attribute ID
 * @param {querystringparameter} - dwvar_<pid>_size - Size Attribute ID
 * @param {category} - non-sensitive
 * @param {returns} - json
 * @param {serverfunction} - get
 */
server.get('Variation', function (req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var priceHelper = require('*/cartridge/scripts/helpers/pricing');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');

    var params = req.querystring;
    var product = ProductFactory.get(params);
    
    //DIS Sized Image functionality
    var DISHelper= require('*/cartridge/scripts/helpers/ProductImageDIS.js');
    var productid  = dw.catalog.ProductMgr.getProduct(product.id);
    var productLength=product.images.large.length;

    for(var i=0; i<productLength; i++){
    var ProductImage=DISHelper.getImage(productid, 'medium', i);
    var mediaFileURL =ProductImage.getURL();
    product.images.large[i].url=mediaFileURL;
    }
    
    var context = {
        price: product.price
    };

    product.price.html = priceHelper.renderHtml(priceHelper.getHtmlContext(context));

    var attributeContext = { product: { attributes: product.attributes } };
    var attributeTemplate = 'product/components/attributesPre';
    product.attributesHtml = renderTemplateHelper.getRenderedHtml(
        attributeContext,
        attributeTemplate
    );

    var promotionsContext = { product: { promotions: product.promotions } };
    var promotionsTemplate = 'product/components/promotions';

    product.promotionsHtml = renderTemplateHelper.getRenderedHtml(
        promotionsContext,
        promotionsTemplate
    );

    var optionsContext = { product: { options: product.options } };
    var optionsTemplate = 'product/components/options';

    product.optionsHtml = renderTemplateHelper.getRenderedHtml(
        optionsContext,
        optionsTemplate
    );

    res.json({
        product: product,
        resources: productHelper.getResources()
    });

    next();
});

/**
 * Product-ShowQuickView : This endpoint is called when a product quick view button is clicked
 * @name Base/Product-ShowQuickView
 * @function
 * @memberof Product
 * @param {middleware} - cache.applyPromotionSensitiveCache
 * @param {querystringparameter} - pid - Product ID
 * @param {category} - non-sensitive
 * @param {serverfunction} - get
 */
server.get('ShowQuickView', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');
    var Resource = require('dw/web/Resource');

    var params = req.querystring;
    var product = ProductFactory.get(params);
    var addToCartUrl = URLUtils.url('Cart-AddProduct');
    var template = product.productType === 'set'
        ? 'product/setQuickView.isml'
        : 'product/quickView.isml';

    var context = {
        product: product,
        addToCartUrl: addToCartUrl,
        resources: productHelper.getResources(),
        quickViewFullDetailMsg: Resource.msg('link.quickview.viewdetails', 'product', null),
        closeButtonText: Resource.msg('link.quickview.close', 'product', null),
        enterDialogMessage: Resource.msg('msg.enter.quickview', 'product', null),
        template: template
    };

    res.setViewData(context);

    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var viewData = res.getViewData();
        var renderedTemplate = renderTemplateHelper.getRenderedHtml(viewData, viewData.template);

        res.json({
            renderedTemplate: renderedTemplate,
            productUrl: URLUtils.url('Product-Show', 'pid', viewData.product.id).relative().toString()
        });
    });

    next();
});

/**
 * Product-SizeChart : This endpoint is called when the "Size Chart" link on the product details page is clicked
 * @name Base/Product-SizeChart
 * @function
 * @memberof Product
 * @param {querystringparameter} - cid - Size Chart ID
 * @param {category} - non-sensitve
 * @param {returns} - json
 * @param {serverfunction} - get
 */
server.get('SizeChart', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');

    var apiContent = ContentMgr.getContent(req.querystring.cid);

    if (apiContent) {
        res.json({
            success: true,
            content: apiContent.custom.body.markup
        });
    } else {
        res.json({});
    }
    next();
});

/**
 * Product-ShowBonusProducts : This endpoint is called when a product with bonus product is added to Cart
 * @name Base/Product-ShowBonusProducts
 * @function
 * @memberof Product
 * @param {querystringparameter} - DUUID - Discount Line Item UUID
 * @param {querystringparameter} - pagesize - Number of products to show on a page
 * @param {querystringparameter} - pagestart - Starting Page Number
 * @param {querystringparameter} - maxpids - Limit maximum number of Products
 * @param {category} - non-sensitive
 * @param {returns} - json
 * @param {serverfunction} - get
 */
server.get('ShowBonusProducts', function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');
    var moreUrl = null;
    var pagingModel;
    var products = [];
    var product;
    var duuid = req.querystring.DUUID;
    var collections = require('*/cartridge/scripts/util/collections');
    var BasketMgr = require('dw/order/BasketMgr');
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    var showMoreButton;
    var selectedBonusProducts;

    if (duuid) {
        var bonusDiscountLineItem = collections.find(currentBasket.getBonusDiscountLineItems(), function (item) {
            return item.UUID === duuid;
        });

        if (bonusDiscountLineItem && bonusDiscountLineItem.bonusProductLineItems.length) {
            selectedBonusProducts = collections.map(bonusDiscountLineItem.bonusProductLineItems, function (bonusProductLineItem) {
                var option = {
                    optionid: '',
                    selectedvalue: ''
                };
                if (!bonusProductLineItem.optionProductLineItems.empty) {
                    option.optionid = bonusProductLineItem.optionProductLineItems[0].optionID;
                    option.optionid = bonusProductLineItem.optionProductLineItems[0].optionValueID;
                }
                return {
                    pid: bonusProductLineItem.productID,
                    name: bonusProductLineItem.productName,
                    submittedQty: (bonusProductLineItem.quantityValue),
                    option: option
                };
            });
        } else {
            selectedBonusProducts = [];
        }

        if (req.querystring.pids) {
            var params = req.querystring.pids.split(',');
            products = params.map(function (param) {
                product = ProductFactory.get({
                    pid: param,
                    pview: 'bonus',
                    duuid: duuid });
                return product;
            });
        } else {
            var URLUtils = require('dw/web/URLUtils');
            var PagingModel = require('dw/web/PagingModel');
            var pageStart = parseInt(req.querystring.pagestart, 10);
            var pageSize = parseInt(req.querystring.pagesize, 10);
            showMoreButton = true;

            var ProductSearchModel = require('dw/catalog/ProductSearchModel');
            var apiProductSearch = new ProductSearchModel();
            var productSearchHit;
            apiProductSearch.setPromotionID(bonusDiscountLineItem.promotionID);
            apiProductSearch.setPromotionProductType('bonus');
            apiProductSearch.search();
            pagingModel = new PagingModel(apiProductSearch.getProductSearchHits(), apiProductSearch.count);
            pagingModel.setStart(pageStart);
            pagingModel.setPageSize(pageSize);

            var totalProductCount = pagingModel.count;

            if (pageStart + pageSize > totalProductCount) {
                showMoreButton = false;
            }

            moreUrl = URLUtils.url('Product-ShowBonusProducts', 'DUUID', duuid, 'pagesize', pageSize, 'pagestart', pageStart + pageSize).toString();

            var iter = pagingModel.pageElements;
            while (iter !== null && iter.hasNext()) {
                productSearchHit = iter.next();
                product = ProductFactory.get({ pid: productSearchHit.getProduct().ID, pview: 'bonus', duuid: duuid });
                products.push(product);
            }
        }
    }

    var context = {
        products: products,
        selectedBonusProducts: selectedBonusProducts,
        maxPids: req.querystring.maxpids,
        moreUrl: moreUrl,
        showMoreButton: showMoreButton,
        closeButtonText: Resource.msg('link.choice.of.bonus.dialog.close', 'product', null),
        enterDialogMessage: Resource.msg('msg.enter.choice.of.bonus.select.products', 'product', null),
        template: 'product/components/choiceOfBonusProducts/bonusProducts.isml'
    };

    res.setViewData(context);

    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var viewData = res.getViewData();

        res.json({
            renderedTemplate: renderTemplateHelper.getRenderedHtml(viewData, viewData.template)
        });
    });

    next();
});

server.get('Data', cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var OrderMgr = require('dw/order/OrderMgr');
    var eventType = req.querystring.eventType;

    if(eventType == 'view_item'){
        var fullObjectProduct = productHelper.showProductPage(req.querystring, req.pageMetaData);
        var breadcrumb = fullObjectProduct.breadcrumbs;
        var product = fullObjectProduct.product;
        var productType = product.productType;
        if (!product.online && productType !== 'set' && productType !== 'bundle') {
            res.setStatusCode(404);
        } else {
            var productData = productHelper.getObjectItems(product,breadcrumb);          
            res.json({"items": [productData]});
        }
    }
    if (eventType == 'purchase') {
        var order = OrderMgr.getOrder(req.querystring.orderNum);
        var purchaseData = productHelper.builderObject(order, req.querystring, req.pageMetaData);
        res.json(purchaseData);
    }
    next();
}, pageMetaData.computedPageMetaData);


module.exports = server.exports();
