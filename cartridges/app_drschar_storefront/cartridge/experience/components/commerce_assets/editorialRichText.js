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

    if (content.richText) {
        model.richText = content.richText;
        model.dsTextAlignment = content.dsTextAlignment;
        model.mbTextAlignment = content.mbTextAlignment;
    }
    switch(content.colorSelect) {
        case 'Danger':
            model.colorSelect = 'danger';
          break;
        case 'Red-Brand':
            model.colorSelect = 'red-brand';
          break;
        case 'Yellow-Brand1':
            model.colorSelect = 'yellow-brand1';
        break;
        case 'Yellow-Brand2':
            model.colorSelect = 'yellow-brand2';
        break;
        case 'Success':
            model.colorSelect = 'success';
          break;
        case 'Gray-Transparent1':
            model.colorSelect = 'gray-transparent1';
        break;
        case 'Gray-Transparent2':
            model.colorSelect = 'gray-transparent2';
        break;
        case 'Gray1':
            model.colorSelect = 'gray1';
        break;
        case 'Gray2':
            model.colorSelect = 'gray2';
        break;
        case 'Gray3':
            model.colorSelect = 'gray3';
        break;
        case 'Gray4':
            model.colorSelect = 'gray4';
        break;
        case 'Gray5':
            model.colorSelect = 'gray5';
        break;
        case 'Gray6':
            model.colorSelect = 'gray6';
        break;
        case 'Gray7':
            model.colorSelect = 'gray7';
        break;
        case 'Gray8':
            model.colorSelect = 'gray8';
        break;
        case 'Gray9':
            model.colorSelect = 'gray9';
        break;
        case 'White-Brand1':
            model.colorSelect = 'white-brand1';
        break;
        case 'White-Brand2':
            model.colorSelect = 'white-brand2';
        break;
        
      }

    return new Template('experience/components/commerce_assets/editorialRichText').render(model).text;
};
