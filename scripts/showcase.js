'use strict';

define([
    "../scripts/layout"
], function (Layout) {

    var Showcase = function () {
        return {
            create: function create() {
                var wrapper = Layout.createEl('section', {
                    class: 'art-showcase-wrapper'
                });

                $('body').append(wrapper);
            }
        }
    }

    return Showcase;
});