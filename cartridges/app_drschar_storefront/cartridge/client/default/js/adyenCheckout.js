"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// eslint-disable-next-line no-unused-vars
var maskedCardNumber;
var MASKED_CC_PREFIX = '************';
var selectedMethod;
var componentsObj = {};
var checkoutConfiguration = window.Configuration;
var formErrorsExist;
var isValid = false;
var checkout;

checkoutConfiguration.onChange = function (state) {
  var type = state.data.paymentMethod.type;
  isValid = state.isValid;

  if (!componentsObj[type]) {
    componentsObj[type] = {};
  }

  componentsObj[type].isValid = isValid;
  componentsObj[type].stateData = state.data;
};

checkoutConfiguration.showPayButton = false;
checkoutConfiguration.paymentMethodsConfiguration = {
  card: {
    enableStoreDetails: showStoreDetails,
    onBrand: function onBrand(brandObject) {
      document.querySelector('#cardType').value = brandObject.brand;
    },
    onFieldValid: function onFieldValid(data) {
      if (data.endDigits) {
        maskedCardNumber = MASKED_CC_PREFIX + data.endDigits;
        document.querySelector('#cardNumber').value = maskedCardNumber;
      }
    },
    onChange: function onChange(state) {
      isValid = state.isValid;
      var componentName = state.data.paymentMethod.storedPaymentMethodId ? "storedCard".concat(state.data.paymentMethod.storedPaymentMethodId) : state.data.paymentMethod.type;

      if (componentName === selectedMethod || selectedMethod === 'bcmc') {
        componentsObj[selectedMethod].isValid = isValid;
        componentsObj[selectedMethod].stateData = state.data;
      }
    }
  },
  afterpay_default: {
    visibility: {
      personalDetails: 'editable',
      billingAddress: 'hidden',
      deliveryAddress: 'hidden'
    },
    data: {
      personalDetails: {
        firstName: document.querySelector('#shippingFirstNamedefault').value,
        lastName: document.querySelector('#shippingLastNamedefault').value,
        telephoneNumber: document.querySelector('#shippingPhoneNumberdefault').value,
        shopperEmail: document.querySelector('#email').value
      }
    }
  },
  facilypay_3x: {
    visibility: {
      personalDetails: 'editable',
      billingAddress: 'hidden',
      deliveryAddress: 'hidden'
    },
    data: {
      personalDetails: {
        firstName: document.querySelector('#shippingFirstNamedefault').value,
        lastName: document.querySelector('#shippingLastNamedefault').value,
        telephoneNumber: document.querySelector('#shippingPhoneNumberdefault').value,
        shopperEmail: document.querySelector('#email').value
      }
    }
  }
};

if (window.installments) {
  try {
    var installments = JSON.parse(window.installments);
    checkoutConfiguration.paymentMethodsConfiguration.card.installments = installments;
  } catch (e) {} // eslint-disable-line no-empty

}


/**
 * Changes the "display" attribute of the selected method from hidden to visible
 */


function displaySelectedMethod(type) {
  selectedMethod = type;
  resetPaymentMethod();

  if (['paypal', 'paywithgoogle', 'mbway'].indexOf(type) > -1) {
    document.querySelector('button[value="submit-payment"]').disabled = true;
  } else {
    document.querySelector('button[value="submit-payment"]').disabled = false;
  }

  document.querySelector("#component_".concat(type)).setAttribute('style', 'display:block');
}
/**
 * To avoid re-rendering components twice, unmounts existing components from payment methods list
 */


function unmountComponents() {
  var promises = Object.entries(componentsObj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    delete componentsObj[key];
    return resolveUnmount(key, val);
  });
  return Promise.all(promises);
}

function resolveUnmount(key, val) {
  try {
    return Promise.resolve(val.node.unmount("component_".concat(key)));
  } catch (e) {
    // try/catch block for val.unmount
    return Promise.resolve(false);
  }
}
/**
 * checks if payment method is blocked and returns a boolean accordingly
 */


function isMethodTypeBlocked(methodType) {
  var blockedMethods = ['bcmc_mobile_QR', 'applepay', 'cup', 'wechatpay', 'wechatpay_pos', 'wechatpaySdk', 'wechatpayQr'];
  return blockedMethods.includes(methodType);
}
/**
 * Calls getPaymenMethods and then renders the retrieved payment methods (including card component)
 */


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

function renderPaymentMethod(paymentMethod, storedPaymentMethodBool, path) {
  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var node;
  var paymentMethodsUI = document.querySelector('#paymentMethodsList');
  var li = document.createElement('li');
  var paymentMethodID = storedPaymentMethodBool ? "storedCard".concat(paymentMethod.id) : paymentMethod.type;
  var isSchemeNotStored = paymentMethod.type === 'scheme' && !storedPaymentMethodBool;
  var paymentMethodImage = storedPaymentMethodBool ? "".concat(path).concat(paymentMethod.brand, ".png") : "".concat(path).concat(paymentMethod.type, ".png");
  var cardImage = "".concat(path, "card.png");
  var imagePath = isSchemeNotStored ? cardImage : paymentMethodImage;
  var label = storedPaymentMethodBool ? "".concat(paymentMethod.name, " ").concat(MASKED_CC_PREFIX).concat(paymentMethod.lastFour) : "".concat(paymentMethod.name);
  var liContents = "\n                              <input name=\"brandCode\" type=\"radio\" value=\"".concat(paymentMethodID, "\" id=\"rb_").concat(paymentMethodID, "\">\n                              <img class=\"paymentMethod_img\" src=\"").concat(imagePath, "\" ></img>\n                              <label id=\"lb_").concat(paymentMethodID, "\" for=\"rb_").concat(paymentMethodID, "\">").concat(label, "</label>\n                             ");

  if (description) {
    liContents += "<p>".concat(description, "</p>");
  }

  var container = document.createElement('div');
  li.innerHTML = liContents;
  li.classList.add('paymentMethod');

  if (storedPaymentMethodBool) {
    node = checkout.create('card', paymentMethod);

    if (!componentsObj[paymentMethodID]) {
      componentsObj[paymentMethodID] = {};
    }

    componentsObj[paymentMethodID].node = node;
  } else {
    var fallback = getFallback(paymentMethod.type);

    if (fallback) {
      var template = document.createElement('template');
      template.innerHTML = fallback;
      container.append(template.content);
    } else {
      try {
        node = checkout.create(paymentMethod.type);

        if (!componentsObj[paymentMethodID]) {
          componentsObj[paymentMethodID] = {};
        }

        componentsObj[paymentMethodID].node = node;
      } catch (e) {} // eslint-disable-line no-empty

    }
  }

  container.classList.add('additionalFields');
  container.setAttribute('id', "component_".concat(paymentMethodID));
  container.setAttribute('style', 'display:none');
  li.append(container);
  paymentMethodsUI.append(li);

  if (paymentMethod.type !== 'paywithgoogle') {
    node && node.mount(container);
  } else {
    node.isAvailable().then(function () {
      node.mount(container);
    })["catch"](function () {}); // eslint-disable-line no-empty
  }

  var input = document.querySelector("#rb_".concat(paymentMethodID));

  input.onchange = function (event) {
    displaySelectedMethod(event.target.value);
  };

  if (paymentMethodID === 'giropay') {
    container.innerHTML = '';
  }

  if (componentsObj[paymentMethodID] && !container.childNodes[0]) {
    componentsObj[paymentMethodID].isValid = true;
  }
} // eslint-disable-next-line no-unused-vars


function addPosTerminals(terminals) {
  var terminalSelect = document.createElement('select');
  terminalSelect.id = 'terminalList';

  for (var t in terminals) {
    var option = document.createElement('option');
    option.value = terminals[t];
    option.text = terminals[t];
    terminalSelect.appendChild(option);
  }

  document.querySelector('#adyenPosTerminals').append(terminalSelect);
}

function resetPaymentMethod() {
  $('#requiredBrandCode').hide();
  $('#selectedIssuer').val('');
  $('#adyenIssuerName').val('');
  $('#dateOfBirth').val('');
  $('#telephoneNumber').val('');
  $('#gender').val('');
  $('#bankAccountOwnerName').val('');
  $('#bankAccountNumber').val('');
  $('#bankLocationId').val('');
  $('.additionalFields').hide();
}
/**
 * Makes an ajax call to the controller function GetPaymentMethods
 */


function getPaymentMethods(paymentMethods) {
  $.ajax({
    url: 'Adyen-GetPaymentMethods',
    type: 'get',
    success: function success(data) {
      paymentMethods(data);
    }
  });
}
/**
 * Makes an ajax call to the controller function PaymentFromComponent. Used by certain payment methods like paypal
 */


function paymentFromComponent(data, component) {
  $.ajax({
    url: 'Adyen-PaymentFromComponent',
    type: 'post',
    data: {
      data: JSON.stringify(data),
      paymentMethod: document.querySelector('#adyenPaymentMethodName').value
    },
    success: function success(data) {
      if (data.orderNo) {
        document.querySelector('#merchantReference').value = data.orderNo;
      }

      if (data.orderToken) {
        document.querySelector('#orderToken').value = data.orderToken;
      }

      if (data.fullResponse && data.fullResponse.action) {
        component.handleAction(data.fullResponse.action);
      } else {
        document.querySelector('#showConfirmationForm').submit();
      }
    }
  }).fail(function () {});
} // Submit the payment

function assignPaymentMethodValue() {
  var adyenPaymentMethod = document.querySelector('#adyenPaymentMethodName');
  adyenPaymentMethod.value = document.querySelector("#lb_".concat(selectedMethod)).innerHTML;
}

function showValidation() {
  var input;

  if (componentsObj[selectedMethod] && !componentsObj[selectedMethod].isValid) {
    componentsObj[selectedMethod].node.showValidation();
    return false;
  }

  if (selectedMethod === 'ach') {
    var inputs = document.querySelectorAll('#component_ach > input');
    inputs = Object.values(inputs).filter(function (input) {
      return !(input.value && input.value.length > 0);
    });

    var _iterator = _createForOfIteratorHelper(inputs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        input = _step.value;
        input.classList.add('adyen-checkout__input--error');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (inputs.length > 0) {
      return false;
    }

    return true;
  }

  if (selectedMethod === 'ratepay') {
    input = document.querySelector('#dateOfBirthInput');

    if (!(input.value && input.value.length > 0)) {
      input.classList.add('adyen-checkout__input--error');
      return false;
    }

    return true;
  }

  return true;
}

function validateCustomInputField(input) {
  if (input.value === '') {
    input.classList.add('adyen-checkout__input--error');
  } else if (input.value.length > 0) {
    input.classList.remove('adyen-checkout__input--error');
  }
}
/**
 * Assigns stateData value to the hidden stateData input field so it's sent to the backend for processing
 */


function validateComponents() {
  if (document.querySelector('#component_ach')) {
    var inputs = document.querySelectorAll('#component_ach > input');

    var _iterator2 = _createForOfIteratorHelper(inputs),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var input = _step2.value;

        input.onchange = function () {
          validateCustomInputField(this);
        };
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  if (document.querySelector('#dateOfBirthInput')) {
    document.querySelector('#dateOfBirthInput').onchange = function () {
      validateCustomInputField(this);
    };
  }

  var stateData;

  if (componentsObj[selectedMethod] && componentsObj[selectedMethod].stateData) {
    stateData = componentsObj[selectedMethod].stateData;
  } else {
    stateData = {
      paymentMethod: {
        type: selectedMethod
      }
    };
  }

  if (selectedMethod === 'ach') {
    var bankAccount = {
      ownerName: document.querySelector('#bankAccountOwnerNameValue').value,
      bankAccountNumber: document.querySelector('#bankAccountNumberValue').value,
      bankLocationId: document.querySelector('#bankLocationIdValue').value
    };
    stateData.paymentMethod = _objectSpread(_objectSpread({}, stateData.paymentMethod), {}, {
      bankAccount: bankAccount
    });
  } else if (selectedMethod === 'ratepay') {
    if (document.querySelector('#genderInput').value && document.querySelector('#dateOfBirthInput').value) {
      stateData.shopperName = {
        gender: document.querySelector('#genderInput').value
      };
      stateData.dateOfBirth = document.querySelector('#dateOfBirthInput').value;
    }
  }

  document.querySelector('#adyenStateData').value = JSON.stringify(stateData);
}
/**
 * Contains fallback components for payment methods that don't have an Adyen web component yet
 */


function getFallback(paymentMethod) {
  var ach = "<div id=\"component_ach\">\n                    <span class=\"adyen-checkout__label\">Bank Account Owner Name</span>\n                    <input type=\"text\" id=\"bankAccountOwnerNameValue\" class=\"adyen-checkout__input\">\n                    <span class=\"adyen-checkout__label\">Bank Account Number</span>\n                    <input type=\"text\" id=\"bankAccountNumberValue\" class=\"adyen-checkout__input\" maxlength=\"17\" >\n                    <span class=\"adyen-checkout__label\">Routing Number</span>\n                    <input type=\"text\" id=\"bankLocationIdValue\" class=\"adyen-checkout__input\" maxlength=\"9\" >\n                 </div>";
  var ratepay = "<span class=\"adyen-checkout__label\">Gender</span>\n                    <select id=\"genderInput\" class=\"adyen-checkout__input\">\n                        <option value=\"MALE\">Male</option>\n                        <option value=\"FEMALE\">Female</option>\n                    </select>\n                    <span class=\"adyen-checkout__label\">Date of birth</span>\n                    <input id=\"dateOfBirthInput\" class=\"adyen-checkout__input\" type=\"date\"/>";
  var fallback = {
    ach: ach,
    ratepay: ratepay
  };
  return fallback[paymentMethod];
}

module.exports = {
  methods: {
    renderGenericComponent: renderGenericComponent
  }
};