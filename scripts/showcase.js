'use strict';

define([
    "../scripts/utility",
    "../scripts/data"
], function(util, data) {

    var Showcase = function Showcase() {
        return {
            create: function create() {
                var images,
                    categories = data.getImageCategories();

                $('.art-gallery').after(util.createEl('article', {
                    class: 'art-showcase'
                }));

                for (var i = 0; i < categories.length; i++) {
                    var cat = categories[i];
                    images = $('.art-image-wrapper[data-category=' + cat + ']');

                }
            },
            createShowcaseEl: function createShowcaseEl(name) {
                var wrapper = util.createEl('figure', {
                        class: 'showcase-img'
                    }),
                    img = util.createEl('img', {
                        src: 'images/' + name + '.jpg'
                    }),
                    caption = util.createEl('figcaption', {
                        class: 'showcase-caption'
                    }, name);

                wrapper.append(img);
                wrapper.append(caption);

                return wrapper;
            }
        }
    }

    return Showcase;
});