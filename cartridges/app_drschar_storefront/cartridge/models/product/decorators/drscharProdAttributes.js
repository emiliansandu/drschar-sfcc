'use strict';

module.exports = function (object, apiProduct) {
    var str = apiProduct.custom.videoMedia;
    var videoMediaEmbed;
    if (str) {
        if (str.indexOf('https://youtu.be/') !== -1) {
            videoMediaEmbed = str.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
        }else if (str.indexOf('http://youtu.be/') !== -1) {
            videoMediaEmbed = str.replace('http://youtu.be/', 'https://www.youtube.com/embed/');
        }
        else if (str.indexOf('https://www.youtube.com/v/') !== -1) {
            videoMediaEmbed = str.replace('https://www.youtube.com/v/', 'https://www.youtube.com/embed/');
        } 
        else if (str.indexOf('http://www.youtube.com/v/') !== -1) {
            videoMediaEmbed = str.replace('http://www.youtube.com/v/', 'https://www.youtube.com/embed/');
        } else if (str.indexOf('https://www.youtube.com/watch?v=') !== -1) {
            videoMediaEmbed = str.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
        }
        else if (str.indexOf('http://www.youtube.com/watch?v=') !== -1) {
            videoMediaEmbed = str.replace('http://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
        }
    }

    Object.defineProperty(object, 'videoMedia', {
        enumerable: true,
        value: videoMediaEmbed
    });
    Object.defineProperty(object, 'gcGlutenFree', {
        enumerable: true,
        value: apiProduct.custom.gcGlutenFree
    });
    Object.defineProperty(object, 'gcWheatFree', {
        enumerable: true,
        value: apiProduct.custom.gcGlutenFree
    });
    Object.defineProperty(object, 'gcDairyFree', {
        enumerable: true,
        value: apiProduct.custom.gcDairyFree
    });
    Object.defineProperty(object, 'gcLactoseFree', {
        enumerable: true,
        value: apiProduct.custom.gcLactoseFree
    });
    Object.defineProperty(object, 'gcNonGMO', {
        enumerable: true,
        value: apiProduct.custom.gcNonGMO
    });
    Object.defineProperty(object, 'gcPreservativeFree', {
        enumerable: true,
        value: apiProduct.custom.gcPreservativeFree
    });
    Object.defineProperty(object, 'textClaim', {
        enumerable: true,
        value: apiProduct.custom.textClaim
    });
    
};
