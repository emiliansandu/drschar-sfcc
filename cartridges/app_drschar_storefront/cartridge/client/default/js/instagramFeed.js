"use strict";

$(function () {
   var div_width = $(".product-tile").width()+'px';
    $(".tile-image-background").css({'height': div_width }); 
    $(window).on("resize",(function() {
     
        var div_width = $(".product-tile").width()+'px';
        $(".product-tile").css({'min-height': div_width });
        $(".tile-image-background").css({'height': div_width }); 
        $(".image-container").css({'height': div_width });
        $(".overlay").css({'height': div_width });
      }));    
});