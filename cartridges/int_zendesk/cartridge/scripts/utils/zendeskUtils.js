function isCartridgeEnabled() {
    var Site = require('dw/system/Site');
    var zendeskLogger = require('./zendeskLogger');

    var logLocation = 'zendeskUtils~isCartridgeEnabled';
    var zendeskCartridgeEnabled = Site.getCurrent().getPreferences().custom.zendeskCartridgeEnabled;

    if (!zendeskCartridgeEnabled) {
        zendeskLogger.logMessage('The Zendesk cartridge is disabled, please check custom preference (ZendeskCartridgeEnabled).', 'info', logLocation);
    }

    return zendeskCartridgeEnabled;
}

exports.isCartridgeEnabled = isCartridgeEnabled;