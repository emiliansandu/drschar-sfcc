'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

/**
 * Render logic for the storefront.editorialRichText component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

   
    var CustomObjectInstance = CustomObjectMgr.getAllCustomObjects('instagramContent');
    var CustomObjectCount = CustomObjectInstance.getCount();
    var CustomObjectData = CustomObjectInstance.asList(0, CustomObjectCount); 
    model.instagramFeed=CustomObjectData;  
 
   
    return new Template('experience/components/drschar_components/instagramFeed').render(model).text;
};
