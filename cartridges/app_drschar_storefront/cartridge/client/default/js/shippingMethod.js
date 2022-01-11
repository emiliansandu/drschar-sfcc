$(document).ajaxStop(function() {
    checkShippingMethodList();
});

$(document).ready(function() {
    checkShippingMethodList();

    $('.shipping-method-list').find('.shipping-method-pricing > del > .shipping-cost').each(function(){
        var shippingCost = $(this).text();
        shippingCost = shippingCost.split('$');
        shippingCost = shippingCost[1];
        var shippingLevelDiscountTotal=$(this).data("shipping-level-discount-total");
        var totalWithAppliedPromotion;
        if(shippingLevelDiscountTotal>shippingCost){
            totalWithAppliedPromotion=0;
        }else{
            totalWithAppliedPromotion=shippingCost-shippingLevelDiscountTotal;
        }
        totalWithAppliedPromotion='$'+parseFloat(totalWithAppliedPromotion).toFixed(2);
        $(this).parent().parent().find(".totalWithAppliedPromotion").text(totalWithAppliedPromotion);
   });
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
