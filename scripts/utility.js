'use strict';

define(function() {
    return {
        detectIE: function detectIE(ua) {
            return /(msie|trident |rv:).?(10|11\.\d)/i.test(ua);
        },
        browseHappy: function browseHappy() {
            if (this.detectIE(navigator.userAgent)) {
                $('body').html('<p class="browserhappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your ' +
                    'browser</a> to improve your experience.</p>');
                return true;
            }
            return false;
        },
        createEl: function createEl(elemName, attr, text) {
            var el = $(document.createElement(elemName));

            for (var key in attr) {
                el.attr(key, attr[key]);
            }

            el.html(text || '');
            return el;
        }
    }
});