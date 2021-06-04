'use strict';

/**
 * Renders zendesk scripts inline using ISML.renderTemplate
 *
 * @param {Object} params - parameters required by Google Anlytics isml temmplate
 */
function htmlHead(params) {
    var ISML = require('dw/template/ISML');
    var templateParams = params || {};
    var templateFile = 'common/GAHeadScript';

    ISML.renderTemplate(templateFile, templateParams);

}

module.exports = {
    htmlHead: htmlHead
};