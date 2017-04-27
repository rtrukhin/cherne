'use strict';

define([
    "../scripts/utility",
    "../scripts/data"
], function(util, data) {

    var Showcase = function Showcase() {
        return {
            create: function create() {
                var imagesByCategory = [],
                    categories = data.getImageCategories();

                $('.art-gallery').after(util.createEl('article', {
                    class: 'art-showcase'
                }));

                for (var i = 0; i < categories.length; i++) {
                    var cat = categories[i],
                        images = data.filterImagesByCategoryName(cat),
                        rndImg = images[Math.floor(Math.random() * images.length)],
                        showcaseEl = this.createShowcaseEl(rndImg);

                    showcaseEl.on('click', $.proxy(function(event) {
                        var cat = $(event.currentTarget).data('category');
                        $(Showcase).trigger(Showcase.EVENTS.showCategory, cat);
                        this.hide();
                    }, this));

                    $('.art-showcase').append(showcaseEl);
                    this.hide();
                }
            },
            createShowcaseEl: function createShowcaseEl(image) {
                var wrapper = util.createEl('figure', {
                        class: 'showcase-img',
                        'data-category': image.category
                    }),
                    img = util.createEl('img', {
                        src: 'images/' + image.name
                    }),
                    caption = util.createEl('figcaption', {
                        class: 'showcase-caption',
                        'data-l10n-id': image.categoryCode
                    });

                wrapper.append(img);
                wrapper.append(caption);

                return wrapper;
            },
            hide: function hide() {
                $('.art-showcase').hide();
            },
            show: function show() {
                $('.art-showcase').show();
            }
        }
    }

    Showcase.EVENTS = {
        showCategory: 'showCategory'
    };

    return Showcase;
});