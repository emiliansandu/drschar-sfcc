/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import { getBillingAgreementToken, createBillingAgreementCall, showCheckoutErrorHtml } from '../../api';
import { clearSessionOption, updateSessionOption, setBAFormValues } from './billingAgreementHelper';
import { getPaypalButtonStyle } from '../../helper';

const loaderInstance = require('../../loader');
const regExprEmail = new RegExp(/(?:[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
let $loaderContainer = document.querySelector('.paypalLoader');
let loader = loaderInstance($loaderContainer);

/**
 * Check for contactInfoEmail input field if not empty
 *
 * @param {Object} _ - arg
 * @param {Object} actions - paypal actions
 * @returns {Function} reject - if incorrect email
 */
function onClick(_, actions) {
    let $contactInfoEmail = document.querySelector('input[name=dwfrm_billing_contactInfoFields_email]');
    let errDiv = $contactInfoEmail.parentElement.querySelector('.invalid-feedback');
    let errStr = 'Please enter a valid email address';
    if ($contactInfoEmail.value.trim() !== ''
        && !regExprEmail.test($contactInfoEmail.value)) {
        showCheckoutErrorHtml(errStr);
        errDiv.innerText = errStr;
        errDiv.style = 'display: block';
        $contactInfoEmail.style = 'border-color: red';
        return actions.reject();
    }

    errDiv.innerText = '';
    errDiv.style = 'display: none';
    $contactInfoEmail.style = 'border-color: rgb(206, 212, 218)';
}

/**
 *  Create's Billing Agreement
 *
 * @returns {string} returns JSON response that includes an data token
 */
function createBillingAgreement() {
    loader.show();
    return getBillingAgreementToken()
        .then((data) => data.token)
        .fail(() => {
            loader.hide();
        });
}

/**
 *  Makes post call using facilitator Access Token and transfers billingToken
 *  save's billingAgreementID & billingAgreementPayerEmail to input field
 *  and triggers checkout place order stage
 *
 * @param {string} billingToken - billing agreement token
 * @returns {Object} JSON response that includes the billing agreement ID and information about the payer
 */
function onApprove({ billingToken }) {
    return createBillingAgreementCall(billingToken)
        .then(({ id, payer }) => {
            let payerInfo = payer.payer_info;
            let billingAddress = payerInfo.billing_address;
            let $restPaypalAccountsList = document.querySelector('#restPaypalAccountsList');
            let hasDefaultPaymentMethod = JSON.parse($restPaypalAccountsList.getAttribute('data-has-default-account'));
            let hasPPSavedAccount = JSON.parse($restPaypalAccountsList.getAttribute('data-has-saved-account'));
            document.querySelector('#sessionPaypalAccount').setAttribute('data-ba-id', id);
            setBAFormValues(id, payerInfo.email);

            if (hasDefaultPaymentMethod && !hasPPSavedAccount) {
                $restPaypalAccountsList.setAttribute('data-has-default-account', false);
                $('#restPaypalAccountsList').data('data-has-default-account', false); // MFRA jquery hack
            }

            let billingAddressFields = [];
            let contactInfoFields = [].slice.call(document.querySelectorAll('.contact-info-block input[required]'));

            var keysValues = {
                email: payerInfo.email,
                phoneNumber: payerInfo.phone,
                billingFirstName: payerInfo.first_name,
                billingLastName: payerInfo.last_name,
                billingAddressOne: billingAddress.line1,
                billingCountry: billingAddress.country_code,
                billingState: billingAddress.state,
                billingAddressCity: billingAddress.city,
                billingZipCode: billingAddress.postal_code
            };
            let $billinAddressBlock = document.querySelector('.billing-address-block');
            if ($billinAddressBlock.querySelector('#billingAddressSelector option:checked').value === 'new') {
                billingAddressFields = [].slice.call($billinAddressBlock.querySelectorAll('input[required], select[required]'));
            }

            (contactInfoFields.concat(billingAddressFields)
                .filter(el => el.value.trim() === ''))
                .forEach(function (el) {
                    el.value = keysValues[el.id];
                });

            document.querySelector('button.submit-payment').click();
            var sameAttribute = [].slice.call($restPaypalAccountsList.options)
                    .find(el => el.value === payerInfo.email);

            (sameAttribute && sameAttribute.id !== 'sessionPaypalAccount') ?
                clearSessionOption() :
                updateSessionOption(payerInfo.email);

            loader.hide();
        })
        .fail(() => {
            loader.hide();
        });
}

/**
 * Hides loader on paypal widget closing without errors

 */
function onCancel() {
    loader.hide();
}

/**
 * Shows errors if paypal widget was closed with errors
 *
 */
function onError() {
    loader.hide();
    showCheckoutErrorHtml('An internal server error has occurred. \r\nRetry the request later.');
}

/**
 *Inits paypal Billing Agreement button on billing checkout page
 */
function initPaypalBAButton() {
    loader.show();
    window.paypal.Buttons({
        onClick,
        createBillingAgreement,
        onApprove,
        onCancel,
        onError,
        style: getPaypalButtonStyle(document.querySelector('.paypal-checkout-ba-button'))
    }).render('.paypal-checkout-ba-button')
        .then(() => {
            loader.hide();
        });
}

export default initPaypalBAButton;
