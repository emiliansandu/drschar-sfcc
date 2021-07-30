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

    //Infinity carousel for bundle childs
    let items = document.querySelectorAll('.carousel .bundle-items')

    items.forEach((el) => {
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    });

    setTimeout(function(){  
         //Infinity carousel for recomended products
        let recomendedItems = document.querySelectorAll('.carousel .recomended-items');

        recomendedItems.forEach((el) => {
            const minPerSlide = 4
            let next = el.nextElementSibling
            for (var i=1; i<minPerSlide; i++) {
                if (!next) {
                    // wrap carousel by using first child
                    next = recomendedItems[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
        });
    }, 3000);  

    $('#bundle-child-carousel-m').find('.product-detail.bundle-item').removeClass('col-3');

});