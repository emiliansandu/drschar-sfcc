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
    var colorSel;
    if (content.richText) {
        model.richText = content.richText;
        model.dsTextAlignment = content.dsTextAlignment;
        model.mbTextAlignment = content.mbTextAlignment;
    }
    if (content.iCon) {
        model.iCon = "&#x"+content.iCon;
    }
    if (content.iconColorSelect) {
        colorSelection(content.iconColorSelect);
        model.iconColorSelect=colorSel;
    }
    if (content.colorSelect) {
        colorSelection(content.colorSelect);
        model.colorSelect=colorSel;
    }
    function colorSelection(colorSelected){
    switch(colorSelected) {
        case 'Danger':
            colorSel = 'danger';
          break;
        case 'Red-Brand':
            colorSel = 'red-brand';
          break;
        case 'Yellow-Brand1':
            colorSel = 'yellow-brand1';
        break;
        case 'Yellow-Brand2':
            colorSel = 'yellow-brand2';
        break;
        case 'Success':
            colorSel = 'success';
          break;
        case 'Gray-Transparent1':
            colorSel = 'gray-transparent1';
        break;
        case 'Gray-Transparent2':
            colorSel = 'gray-transparent2';
        break;
        case 'Gray1':
            colorSel = 'gray1';
        break;
        case 'Gray2':
            colorSel = 'gray2';
        break;
        case 'Gray3':
            colorSel = 'gray3';
        break;
        case 'Gray4':
            colorSel = 'gray4';
        break;
        case 'Gray5':
            colorSel = 'gray5';
        break;
        case 'Gray6':
            colorSel = 'gray6';
        break;
        case 'Gray7':
            colorSel = 'gray7';
        break;
        case 'Gray8':
            colorSel = 'gray8';
        break;
        case 'Gray9':
            colorSel = 'gray9';
        break;
        case 'White-Brand1':
            colorSel = 'white-brand1';
        break;
        case 'White-Brand2':
            colorSel = 'white-brand2';
        break;
        
      }
      return colorSel;
    }

    return new Template('experience/components/drschar_components/editorialRichTextIcon').render(model).text;
};
