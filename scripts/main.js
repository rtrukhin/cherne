/**
 * Created by rtrukh on 26.05.2016.
 */
({
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
    updateHeader: function updateHeader(data) {
        var header = $('header'),
            nav = this.createStructureEl('nav', 'nav');

        this.categories = [].concat(data.images.map(function (img) {
            return img.category;
        }));

        nav.append('<ul>');

        this.categories.forEach(function (elem, index, array) {
            if (index === array.indexOf(elem)) {
                nav.append('<li><a href="#" class="breadcrumb" data-tag="' + elem + '">' + elem + '</a></li>');
            }
        });

        nav.append('<li><a href="#" id="about">Про мене</a></li>');
        nav.append('</ul>');
        header.append(nav);

        $('.breadcrumb').on('click', this.onNavClickHandler.bind(this));

        $('#about').on('click', function () {
            this.showPopup('about.html');
        }.bind(this));
    },

    createGalleryCategory: function createGalleryCategory() {


    },

    updateGallery: function updateGallery(data) {
        var galleryEl = $('.art-gallery'),
            imgEl,
            captionCnt;
        
        this.imagesData = data.images;

        this.imagesData.map(function (img, index) {
            galleryEl.append(this.createImageEl(img));
        }.bind(this));

        this.imagesEl = $('.art-gallery-thumb');

        $('.captionCnt').on('click', function (e) {
            e.preventDefault();
            if (e.target.className === 'tag') {
                $(e.target).trigger('custom');
            }
            return false;
        });

        $('.tag').on('custom', this.onNavClickHandler.bind(this));
    },

    onThumbClickHandler: function onThumbClickHandler(e) {
        this.showPopup(null, e.target.id);
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
        return $("<figure data-tag='" + img.category + "' class='art-gallery-thumb'>" +
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

    hideAllImagesEl: function () {
      this.imagesEl.map(function (index, img) {
        $(img).removeClass('hidden');
        $(img).addClass('hidden');
      });
    },

    showImages: function showImages(images) {
        this.hideAllImagesEl();
        images.map(function (index, img) {
            $(img).removeClass('hidden');
        });
    },

    filterImagesByCategory: function filterImagesByCategory(images, tag) {
        return images.filter(function(index, img) {
           return img.dataset.tag.indexOf(tag) > -1;
        });
    },

    loadConfig: function loadConfig(callback) {
        $.getJSON('./config.json').done(function (data) {
            if (data) {
                callback(data);
            }
        });
    }
}).init();