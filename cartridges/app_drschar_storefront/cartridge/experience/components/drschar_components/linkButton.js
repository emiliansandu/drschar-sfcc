'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');


/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.link = content.buttonLink ? content.buttonLink : '#';
    model.text = content.text;
    if(content.buttonClass == 'primary'){
        model.btnClass = 'btn-primary';
    }else{
        model.btnClass = 'btn-outline-primary';
    };

    return new Template('experience/components/drschar_components/linkButton').render(model).text;
};