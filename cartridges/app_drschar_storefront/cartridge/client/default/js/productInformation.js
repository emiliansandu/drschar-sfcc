'use strict';

var scrollAnimate = require('base/components/scrollAnimate');

$(document).ready(function () {
    
    //Use scroll animate when btn is click
    $('#more-info-btn').click(function () {
        scrollAnimate($('.description-and-detail'));
    });

    //Dinamic resize image height - Square image
    var elem = $(".carousel-item.active")[0];
  
    let resizeObserver = new ResizeObserver(() => {
        var cw = $('.carousel-item.active').width();
        $('.carousel-image, .img-thumbnail').css({'width':cw+'px'});
        $('.carousel-image, .img-thumbnail').css({'height':cw+'px'});
    });

    resizeObserver.observe(elem);

    var longDescContent = $('.longDescContent').text();
    $('.longDescContent').text('');
    $('.longDescContent').append($.parseHTML(longDescContent));

});