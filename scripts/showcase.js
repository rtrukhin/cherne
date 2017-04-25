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
                        images = $('.art-image-wrapper[data-category=' + cat + ']'),
                        rndImg = images[Math.floor(Math.random() * images.length)],
                        rndImgName = $(rndImg).find('img').attr('src').split('/')[1].split('.')[0],
                        showcaseEl = this.createShowcaseEl(rndImgName, cat);

                    showcaseEl.on('click', $.proxy(function(event) {
                        var cat = $(event.currentTarget).data('category');
                        $(Showcase).trigger(Showcase.EVENTS.showCategory, cat);
                        this.hide();
                    }, this));

                    $('.art-showcase').append(showcaseEl);
                    this.hide();
                }
            },
            createShowcaseEl: function createShowcaseEl(name, cat) {
                var wrapper = util.createEl('figure', {
                        class: 'showcase-img',
                        'data-category': cat
                    }),
                    img = util.createEl('img', {
                        src: 'images/' + name + '.jpg'
                    }),
                    caption = util.createEl('figcaption', {
                        class: 'showcase-caption'
                    }, cat);

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