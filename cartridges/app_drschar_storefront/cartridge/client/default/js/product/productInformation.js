'use strict';

var scrollAnimate = require('base/components/scrollAnimate');

$(document).ready(function () {
    
    //Use scroll animate when btn is click
    $('#more-info-btn').click(function () {
        scrollAnimate($('.description-and-detail'));
    });

    //Dinamic resize image height - Square image
    var elem = $(".img-fluid, .img-thumbnail")[0];
  
    let resizeObserver = new ResizeObserver(() => {
        var cw = $('.img-fluid, .img-thumbnail').width();
        $('.img-fluid, .img-thumbnail').css({'height':cw+'px'});
    });

    resizeObserver.observe(elem);

});