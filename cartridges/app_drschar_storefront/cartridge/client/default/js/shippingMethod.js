$(document).ajaxStop(function() {
    checkShippingMethodList();
});

$(document).ready(function() {
    checkShippingMethodList();
});



function checkShippingMethodList() {
    var methods = $('.shipping-method-list').find('.form-check').length;
    if(methods != 0 ){
        $('.warningShipping').removeClass('d-block');
        $('.warningShipping').addClass('d-none');
        $('button.submit-shipping').prop('disabled', false);
    }
    else {
        $('.warningShipping').removeClass('d-none');
        $('.warningShipping').addClass('d-block');
        $('button.submit-shipping').prop('disabled', true);
    }
}
