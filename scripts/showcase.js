'use strict';

define([
    "../scripts/utility"
], function(util) {

    var Showcase = function Showcase() {
        return {
            categories: [],
            create: function create(images) {
                this.categories = this.getImageCategories(images);

                $('.art-gallery').after(util.createEl('article', {
                    class: 'art-showcase'
                }));

                for (var i = 0; i < this.categories.length; i++) {
                    var cat = this.categories[i],
                        imagesByCategory = images.filter(function(el, i, arr) {
                            return el.category.indexOf(cat) > -1;
                        }, cat),
                        rndImg = imagesByCategory[Math.floor(Math.random() * imagesByCategory.length)],
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

            getImageCategories: function getImageCategories(images) {
                var categories = [];

                images.forEach(function(img) {
                    if (categories.indexOf(img.category) === -1) {
                        categories.push(img.category);
                    }
                }, this);

                return categories;
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