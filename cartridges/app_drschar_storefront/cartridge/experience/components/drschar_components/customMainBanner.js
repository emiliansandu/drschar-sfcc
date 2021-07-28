'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = new HashMap();
    var content = context.content;

    model.heading = content.heading;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.categoryLink = "";

    if(content.categoryLink != undefined){
        model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID()).toString();
    }

    model.color = content.color;
    model.position = content.position;
    if(content.position == 'bottom'){
        model.position = content.position+'-custom-banner';
    }
    

    return new Template('experience/components/drschar_components/customMainBanner').render(model).text;
};
