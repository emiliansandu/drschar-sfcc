'use strict';

var scrollAnimate = require('base/components/scrollAnimate');

$(document).ready(function () {
    
    //Use scroll animate when btn is click
    $('#more-info-btn').click(function () {
        scrollAnimate($('.description-and-detail'));
    });

});