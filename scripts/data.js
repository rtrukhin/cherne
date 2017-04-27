'use strict';

define(["../scripts/config-prod"], function(Config) {
    var Data;

    (function(cfg) {
        var findImageCategories = function findImageCategories(images) {
                var res = [];
                for (var i = 0; i < images.length; i++) {
                    var cat = images[i].category;
                    if (!res.includes(cat)) {
                        res.push(cat);
                    }
                }
                return res;
            },
            categories = findImageCategories(cfg.images),
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
            this.filterImagesByCategoryName = function filterImagesByCategoryName(catName) {
                var res = [],
                    images = cfg.images;
                for (var i = 0; i < images.length; i++) {
                    var cat = images[i].category;
                    if (cat === catName) {
                        res.push(images[i]);
                    }
                }
                return res;
            };
        }
    })(Config);

    return new Data();
});