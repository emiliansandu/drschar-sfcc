'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the storefront.editorialRichText component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    var instaHelper = require('*/cartridge/scripts/helpers/instagramHelper');

    if (content.apiPath && content.accessToken) {
    var instaFeed = instaHelper.getFeed(content.apiPath, content.accessToken);
    model.instagramFeed=instaFeed;    
    }
   
    return new Template('experience/components/drschar_components/instagramFeed').render(model).text;
};
