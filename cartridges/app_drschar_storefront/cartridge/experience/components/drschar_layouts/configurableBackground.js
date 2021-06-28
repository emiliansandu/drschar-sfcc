'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for drschar storefront.configurableBackground layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
if(context.content.backgroundWidth){
    model.backgroundWidth='w-100';
}else{
    model.backgroundWidth='w-auto';
}
if(context.content.colorSelect){
    model.colorSelect=context.content.colorSelect;
}
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/drschar_layouts/configurableBackground').render(model).text;
};