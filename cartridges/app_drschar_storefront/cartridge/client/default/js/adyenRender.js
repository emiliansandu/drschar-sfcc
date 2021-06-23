"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function renderGenericComponent() {
    return _renderGenericComponent.apply(this, arguments);
}

function _renderGenericComponent() {
    _renderGenericComponent = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(Object.keys(componentsObj).length !== 0)) {
                            _context.next = 3;
                            break;
                        }

                        _context.next = 3;
                        return unmountComponents();

                    case 3:
                        getPaymentMethods(function (data) {
                            var paymentMethod;
                            var i;
                            checkoutConfiguration.paymentMethodsResponse = data.AdyenPaymentMethods;

                            if (data.amount) {
                                checkoutConfiguration.amount = data.amount;
                                checkoutConfiguration.paymentMethodsConfiguration.paypal.amount = data.amount;
                            }

                            if (data.countryCode) {
                                checkoutConfiguration.countryCode = data.countryCode;
                            }

                            checkout = new AdyenCheckout(checkoutConfiguration);
                            document.querySelector('#paymentMethodsList').innerHTML = '';

                            if (data.AdyenPaymentMethods.storedPaymentMethods) {
                                for (i = 0; i < checkout.paymentMethodsResponse.storedPaymentMethods.length; i++) {
                                    paymentMethod = checkout.paymentMethodsResponse.storedPaymentMethods[i];

                                    if (paymentMethod.supportedShopperInteractions.includes('Ecommerce')) {
                                        renderPaymentMethod(paymentMethod, true, data.ImagePath);
                                    }
                                }
                            }

                            data.AdyenPaymentMethods.paymentMethods.forEach(function (pm, i) {
                                !isMethodTypeBlocked(pm.type) && renderPaymentMethod(pm, false, data.ImagePath, data.AdyenDescriptions[i].description);
                            });

                            if (data.AdyenConnectedTerminals && data.AdyenConnectedTerminals.uniqueTerminalIds && data.AdyenConnectedTerminals.uniqueTerminalIds.length > 0) {
                                var posTerminals = document.querySelector('#adyenPosTerminals');

                                while (posTerminals.firstChild) {
                                    posTerminals.removeChild(posTerminals.firstChild);
                                }

                                addPosTerminals(data.AdyenConnectedTerminals.uniqueTerminalIds);
                            }

                            var firstPaymentMethod = document.querySelector('input[type=radio][name=brandCode]');
                            firstPaymentMethod.checked = true;
                            displaySelectedMethod(firstPaymentMethod.value);
                        });

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));
    return _renderGenericComponent.apply(this, arguments);
}

module.exports = {
    methods: {
        renderGenericComponent: renderGenericComponent
    }
};