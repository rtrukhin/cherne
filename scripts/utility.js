'use strict';

define(function () {
    return {
        detectIE: function detectIE(ua) {
            return /(msie|trident |rv:).?(10|11\.\d)/i.test(ua);
        },
        browseHappy: function browseHappy(cb, param) {
            if (this.detectIE(navigator.userAgent)) {
                $('body').html('<p class="browserhappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your ' +
                    'browser</a> to improve your experience.</p>');
            } else {
                cb(param);
            }
        }
    }
});