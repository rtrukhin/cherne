'use strict';

/**
 * Created by rtrukh on 26.05.2016.
 */

requirejs([
    "../node_modules/jquery/dist/jquery.min",
    "../scripts/utility",
    "../scripts/showcase",
    "../scripts/layout"
], function(jquery, Util, Showcase, Layout) {
    var cherneArt = {
        init: function init() {
            if (!Util.browseHappy()) {
                this.instantiate();
            }
        },
        instantiate: function instantiate() {
            var layout = new Layout(),
                showcase = new Showcase();

            layout.create();
            showcase.create();

            $(Showcase).on(Showcase.EVENTS.showCategory, function() {
                var category = arguments[1];
                layout.filterImagesByCategory(category);
            });
            $(Layout).on(Layout.EVENTS.openShowcase, function() {
                showcase.show();
            });
        }

    }

    cherneArt.init();

});