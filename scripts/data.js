'use strict';

define(["../scripts/config-prod"], function(Config) {
    var Data;

    (function(cfg) {
        var setImageCategories = function setImageCategories(images) {
                var res = [];
                for (var i = 0; i < images.length; i++) {
                    var cat = images[i].category;
                    if (!res.includes(cat)) {
                        res.push(cat);
                    }
                }
                return res;
            },
            categories = setImageCategories(cfg.images),
            instance;

        Data = function Data() {
            if (instance) {
                return instance;
            }
            instance = this;

            this.getImageCategories = function getImageCategories() {
                return categories;
            };
            this.getImages = function getImages() {
                return cfg.images;
            };
        }
    })(Config);

    return new Data();
});