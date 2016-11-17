'use strict';

/**
 * Created by rtrukh on 26.05.2016.
 */

requirejs([
    "../bower_components/jQuery/dist/jquery",
    "../scripts/utility",
    "../scripts/layout"
], function (jquery, Util, Layout) {
    var cherneArt = {
        imagesEl: [],
        init: function init() {
            if (!Util.browseHappy()) {
                this.instantiate();
            }
        },

        instantiate: function instantiate() {
            Layout.createLayout();

            /*this.updateGallery();
            this.updateHeader();
            this.updateFooter();

            this.showSplashScreen();*/
        },
        showSplashScreen: function showSplashScreen() {
            this.showPopup('Андрій Чернець', '0.jpg');
        },

        addAllImagesAsHidden: function addAllImagesAsHidden() {
            var galleryEl = $('.art-gallery'),
                galleryImages = this.createStructureEl('section', 'art-gallery-images');

            this.imagesData.map(function (value, index, arr) {
                var imgEl = this.createImageEl(value);
                this.imagesEl.push(imgEl[0])
                galleryImages.append(imgEl);
            }, this);

            galleryEl.append(galleryImages);
        },

        resetGallery: function resetGallery() {
            this.show($('.art-gallery-showcase'));
            this.hideAllImagesEl();
        },

        onThumbClickHandler: function onThumbClickHandler(e) {
            this.showPopup(null, e.target.id);
        },

        hide: function hide(el) {
            $(el).addClass('hidden');
        },

        show: function show(el) {
            $(el).removeClass('hidden');
        },

        showPopup: function showPopup(content, background) {
            var popup = $('.art-modal-popup'),
                loadEl = $('<div>');

            background = background ? 'url(images/' + background + ')' : 'none';

            loadEl.load(content, function (text, type, data) {
                if (data.status === 200) {
                    popup.html(text);
                } else if (data.status > 200) {
                    popup.html('<div class="art-modal-text">' + content + '</div>');
                }
            });

            popup.css('background-image', background);
            popup.toggleClass('active');
            popup.on('click', function () {
                popup.toggleClass('active');
                popup.off();
            });
        },

        createImageEl: function createImageEl(img) {
            return $("<figure data-tag='" + img.category + "' class='art-gallery-thumb hidden'>" +
                "<img src='images/" + img.name + "'>" +
                "<figcaption>" +
                "<span class='caption'>" + img.caption + "</span>" +
                "<span class='size'>" + img.size + "</span>" +
                "<span class='material'>" + img.material + "</span>" +
                "</figure>");
        },

        onNavClickHandler: function onNavClickHandler(e) {
            var images = this.filterImagesByCategory(this.imagesEl, e.currentTarget.dataset.tag);
            this.showImages(images);
            this.hide($('.art-gallery-showcase'));
        },

        hideAllImagesEl: function () {
            var me = this;
            me.imagesEl.map(function (img) {
                this.show(img);
                this.hide(img);
            }, me);
        },

        showImages: function showImages(images) {
            var me = this;
            me.hideAllImagesEl();
            images.map(function (img) {
                this.show(img);
            }, me);
        },

        filterImagesByCategory: function filterImagesByCategory(images, tag) {
            return images.filter(function (img) {
                return img.dataset.tag.indexOf(tag) > -1;
            });
        }
    }

    cherneArt.init();

});