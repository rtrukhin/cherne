'use strict';

define(function() {
    var instance = null;

    function Data() {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
        }
        /*$.get('../scripts/config-prod.json', function(cfg) {
        });*/
        this.initialize();
    }
    Data.prototype = {
        initialize: function(images) {
            this.images = images;
            this.bar = 1;
        }
    };
    Data.getInstance = function() {
        if (instance === null) {
            instance = new Data();
        }
        return instance;
    };

    return Data.getInstance();
});


/*var Data = function Data() {

    return {
        findImageCategories: function findImageCategories(images) {
            var res = [];
            for (var i = 0; i < images.length; i++) {
                var cat = images[i].category;
                if (!res.includes(cat)) {
                    res.push(cat);
                }
            }
            return res;
        },
        ilterImagesByCategoryName: function filterImagesByCategoryName(catName) {
            var res = [],
                images = cfg.images;
            for (var i = 0; i < images.length; i++) {
                var cat = images[i].category;
                if (cat === catName) {
                    res.push(images[i]);
                }
            }
            return res;
        },
        getImageCategories: function getImageCategories() {
            return categories;
        },
        getImages: function getImages() {
            return cfg.images;
        },
        init: function init() {
            $.get('../scripts/config-prod.json', function(cfg) {
                this.categories = this.findImageCategories(cfg.images);
            });
        }
    };
};

return new Data.init();*/