"use strict";

$(function () {
  $(window).on('load', function() {
    instagramTileResize();
   }); 
    $(window).on("resize",(function() {
      instagramTileResize();
      }));    
});
function instagramTileResize(){
  $(".experience-drschar_components-instagramFeed").css("display", "block");
  var div_width = $(".product-tile").width()+'px';
   $(".product-tile").css({'min-height': div_width });
    $(".tile-image-background").css({'height': div_width }); 
    $(".image-container").css({'height': div_width });
    $(".overlay").css({'height': div_width });

}