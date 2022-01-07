/**
 * Extension to default CheckoutShippingServices controller to provide custom
 * implementation for Address validation on shipping page for single shipment.
 * @module  controllers/CheckoutShippingServices
 */

'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.extend(module.superModule);

server.append('SubmitShipping',
	server.middleware.https,
	csrfProtection.validateAjaxRequest,
	function (req, res, next) {
		var URLUtils = require('dw/web/URLUtils');
		var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
		var addressFieldsForm = session.forms.shipping.shippingAddress.addressFields;
		var fieldErrors = {};
		var data = res.getViewData();

		var currentBasket = dw.order.BasketMgr.getCurrentBasket();
		if (!currentBasket) {
			res.json({
				error: true,
				cartError: true,
				fieldErrors: [],
				serverErrors: [],
				redirectUrl: URLUtils.url('Cart-Show').toString()
			});
			return next();
		}

		var form = server.forms.getForm('shipping');
		var result = {};
		var shippingFormErrors = COHelpers.validateShippingForm(form.shippingAddress);

		if (Object.keys(shippingFormErrors).length > 0) {
			req.session.privacyCache.set(currentBasket.defaultShipment.UUID, 'invalid');
			res.json({
				form: form,
				fieldErrors: [shippingFormErrors],
				serverErrors: [],
				error: true
			});
			return next();
		}
		
		return next();
	});

module.exports = server.exports();