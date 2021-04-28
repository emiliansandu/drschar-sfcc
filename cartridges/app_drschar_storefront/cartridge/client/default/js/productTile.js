'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    console.log('Hi');
    processInclude(require('base/product/quickView'));
})