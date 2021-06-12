'use strict';

$(function(){
   $(".editorialRichText-component-container").find("p").each(function(){
    $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">link</a> ') );
 });
  }); 