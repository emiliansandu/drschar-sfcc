"use strict";

$(function () {
   var div_height = $(".product-tile").height()+'px';
    $(".tile-image-background").css({'height': div_height }); 
    $(window).on("resize",(function() {
        $(".tile-image-background").css({'height': 100+'%' });
        var div_height = $(".product-tile").height()+'px';
        $(".tile-image-background").css({'height': div_height });
      }));    
});