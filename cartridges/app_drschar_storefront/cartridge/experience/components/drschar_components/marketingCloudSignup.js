'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var server = require('server');

/**
 * Render logic for the storefront.editorialRichText component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    model.signupForm=server.forms.getForm('marketingCloudSignupForm');
    return new Template('experience/components/drschar_components/marketingCloudSignup').render(model).text;
};
