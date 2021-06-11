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
        case 'Simple-Red':
            model.colorSelect = 'simple-red';
          break;
        case 'Red-Brand':
            model.colorSelect = 'red-brand';
          break;
        case 'Red-Wine':
            model.colorSelect = 'red-wine';
        break;
        case 'Dark-Purpple':
            model.colorSelect = 'dark-purpple';
          break;
        case 'Darker-Purpple':
            model.colorSelect = 'darker-purpple';
        break;
        case 'Yellow-Brand':
            model.colorSelect = 'yellow-brand';
        break;
        case 'Yellow-Brand-2':
            model.colorSelect = 'yellow-brand-2';
        break;
        case 'White-Brand':
            model.colorSelect = 'white-brand';
        break;
        case 'White-Brand-2':
            model.colorSelect = 'white-brand2';
        break;
        
      }

    return new Template('experience/components/commerce_assets/editorialRichText').render(model).text;
};
