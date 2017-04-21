'use strict';

define(["../scripts/config-prod"], function(Config) {
    var Data;

    (function(images) {
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
            categories = setImageCategories(images),
            images = images,
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
                return images;
            };
        }
    })(Config.images);

    return new Data();
});