'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var carouselBuilder = require('*/cartridge/scripts/experience/utilities/carouselBuilder.js');

/**
 * Render logic for storefront.carousel layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    context.content.xsCarouselSlidesToDisplay = "1";
    context.content.smCarouselSlidesToDisplay = "1";
    context.content.mdCarouselSlidesToDisplay = "1";

    if(context.content.autoplayControl==true && context.content.autoplaySlideTimeInterval){
        model.autoplay="carousel";
        model.autoplaySlideInterval=context.content.autoplaySlideTimeInterval;
     }else{
         model.autoplay="";
         model.autoplaySlideInterval='false';
     }

    model = carouselBuilder.init(model, context);

    return new Template('experience/components/drschar_layouts/oneSlideShowCarousel').render(model).text;
};