'use strict';

$(window).on("load",function() {
    var url = $('#order-field').data("url");
    var eventType = 'purchase';
    if(url != undefined){
        eventGA(url,eventType);
    }
     
});

function eventGA(url,eventType){
    if (url) {
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                gtag('event',eventType,data);
            },
            error: function() {
                
            }
        });
    }
}

module.exports = {
    "eventGA": eventGA
}