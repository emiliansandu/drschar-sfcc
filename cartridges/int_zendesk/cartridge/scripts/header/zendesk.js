'use strict';

/**
 * Renders zendesk scripts inline using ISML.renderTemplate
 *
 * @param {Object} params - parameters required by zendeskheader isml temmplate
 */
function htmlHead(params) {
    var ISML = require('dw/template/ISML');
    var zendeskUtils = require('*/cartridge/scripts/utils/zendeskUtils.js');
    var zendeskLogger = require('*/cartridge/scripts/utils/zendeskLogger');

    var templateParams = params || {};
    templateParams.zendeskUtils = zendeskUtils;

    var templateFile = 'common/zendeskHeader';

    if (zendeskUtils.isCartridgeEnabled()) {
        try {
            ISML.renderTemplate(templateFile, templateParams);

        } catch (ex) {
            zendeskLogger.logMessage('Something went wrong while loading the zendesk header scripts template, Exception code is: ' + ex, 'error', 'scripts/header/zendesk.js');
        }
    }
}

module.exports = {
    htmlHead: htmlHead
};