/**
 * Created by rtrukh on 26.05.2016.
 */
var cherneArt = (function() {
    return {
        config: null,
        categories: [],
        imagesData: [],
        imagesEl: [],
        init: function init() {
            this.browseHappy();
        },
        detectIE: function detectIE(ua) {
            return /(msie|trident |rv:).?(10|11\.\d)/i.test(ua);
        },
        browseHappy: function browseHappy() {
            if (this.detectIE(navigator.userAgent)) {
                $('body').html('<p class="browserhappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your ' +
                    'browser</a> to improve your experience.</p>');
            } else {
                this.loadConfig(this.onConfigLoaded.bind(this));
            }
        },
        onConfigLoaded: function onConfigLoaded(data) {
            this.prepareData(data);
            this.createStructure();
            this.updateGallery(data);
            this.updateHeader(data);
            this.updateFooter();
            this.showSplashScreen();
        },
        showSplashScreen: function showSplashScreen() {
            this.showPopup('Андрій Чернець', '0.jpg');
        },
        createStructure: function createStructure() {
            var body = $('body');

            body.append(this.createStructureEl('header', 'art-header'));
            body.append(this.createStructureEl('article', 'art-gallery'));
            body.append(this.createStructureEl('footer', 'art-footer'));
            body.append(this.createStructureEl('div', 'art-modal-popup'));
        },
        createStructureEl: function createStructureEl(elemName, className) {
            var el = $(document.createElement(elemName));
            el.addClass(className);
            return el;
        },
        updateFooter: function updateFooter() {
            $('footer').html(new Date().getFullYear() + '&nbsp;&copy;&nbsp;' + 'Андрій Чернець');
        },
        prepareData: function(data) {
            this.categories = this.getImageCategories(data.images);
            this.imagesData = data.images;
        },
        getImageCategories: function(images) {
            var res = [];
            for (var i = 0; i < images.length; i++) {
                var cat = images[i].category;
                if (!res.includes(cat)) {
                    res.push(cat);
                }
            }
            return res;
        },
        updateHeader: function updateHeader() {
            var header = $('header'),
                nav = this.createStructureEl('nav', 'nav'),
                ul = this.createStructureEl('ul');

            ul.append('<img class="art-logo" src="images/logo.jpg">');
            this.categories.forEach(function(elem) {
                ul.append('<li><a href="#" class="breadcrumb" data-tag="' + elem + '">' + elem + '</a></li>');
            });

            ul.append('<li><a href="#" class="breadcrumb" id="about">Ciricullum Vitae</a></li>');
            nav.append(ul);
            header.append(nav);

            $('.breadcrumb').on('click', this.onNavClickHandler.bind(this));

            $('#about').on('click', function() {
                this.showPopup('about.html');
            }.bind(this));
        },

        createGalleryCategoryEl: function createGalleryCategory(category) {
            var galleryEl = this.createStructureEl("figure", "art-gallery-category");

            var catImages = this.imagesData.filter(function(value, index, arr) {
                return value.category === category;
            });

            galleryEl.append('<figcaption>' + category + '</figcaption>');
            catImages.forEach(function(value, index, arr) {
                galleryEl.append('<img src="images/' + value.name + '" >');
            });

            return galleryEl;
        },

        addAllImagesAsHidden: function addAllImagesAsHidden() {
            var galleryEl = $('.art-gallery'),
                galleryImages = this.createStructureEl('section', 'art-gallery-images');

            this.imagesData.map(function(value, index, arr) {
                var imgEl = this.createImageEl(value);
                this.imagesEl.push(imgEl[0])
                galleryImages.append(imgEl);
            }, this);

            galleryEl.append(galleryImages);
        },

        updateGallery: function updateGallery() {
            var galleryEl = $('.art-gallery'),
                galleryShowcase = this.createStructureEl('section', 'art-gallery-showcase');

            this.addAllImagesAsHidden();

            this.categories.map(function(value, index, arr) {
                var me = this;
                var catEl = this.createGalleryCategoryEl(value);
                catEl[0].addEventListener('click', function(event) {
                    galleryShowcase.addClass('hidden');
                    var images = this.filterImagesByCategory(this.imagesEl, value);
                    this.showImages(images);
                }.bind(me));
                galleryShowcase.append(catEl);
            }, this)

            galleryEl.append(galleryShowcase);
        },

        onThumbClickHandler: function onThumbClickHandler(e) {
            this.showPopup(null, e.target.id);
        },

        showPopup: function showPopup(content, background) {
            var popup = $('.art-modal-popup'),
                loadEl = $('<div>');

            background = background ? 'url(images/' + background + ')' : 'none';

            loadEl.load(content, function(text, type, data) {
                if (data.status === 200) {
                    popup.html(text);
                } else if (data.status > 200) {
                    popup.html('<div class="art-modal-text">' + content + '</div>');
                }
            });

            popup.css('background-image', background);
            popup.toggleClass('active');
            popup.on('click', function() {
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
        },

        hideAllImagesEl: function() {
            this.imagesEl.map(function(img) {
                $(img).removeClass('hidden');
                $(img).addClass('hidden');
            });
        },

        showImages: function showImages(images) {
            this.hideAllImagesEl();
            images.map(function(img) {
                $(img).removeClass('hidden');
            });
        },

        filterImagesByCategory: function filterImagesByCategory(images, tag) {
            return images.filter(function(img) {
                return img.dataset.tag.indexOf(tag) > -1;
            });
        },

        loadConfig: function loadConfig(callback) {
            $.getJSON('./config.json').done(function(data) {
                if (data) {
                    callback(data);
                }
            });
        }
    }
})();

cherneArt.init();