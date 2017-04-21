'use strict';

/**
 * Created by rtrukh on 26.05.2016.
 */

requirejs([
    "../bower_components/jQuery/dist/jquery",
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

            $(layout).on(Layout.EVENTS.openShowcase, showcase.create);

            layout.create();
            // showcase.create();

            // layout.showAllImages();
        },

        showSplashScreen: function showSplashScreen() {
            this.showPopup('Андрій Чернець', '0.jpg');
        }
    }

    cherneArt.init();

});