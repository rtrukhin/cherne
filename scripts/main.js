/**
 * Created by rtrukh on 26.05.2016.
 */


({
    mainContainer: $('#art-main-container'),
    config: null,
    categories: [],
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
        body.append(this.createStructureEl('section', 'art-gallery'));
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
            nav = $('<div class="nav"></div>');

        this.categories = [].concat(data.images.map(function (img) {
            return img.category;
        }));

        this.categories.forEach(function (elem, index, array) {
            if (index == array.indexOf(elem)) {
                nav.append('<a href="#" class="breadcrumb" data-tag="' + elem + '">' + elem + '</a>');
            }
        });

        nav.append('<a href="#" id="about">Про мене</a>');
        header.append(nav);

        $('.breadcrumb').on('click', this.onTagClickHandler.bind(this));

        $('#about').on('click', function () {
            this.showPopup('about.html');
        }.bind(this));
    },

    updateGallery: function updateGallery(data) {
        var images = data.images,
            galleryEl = $('.art-gallery'),
            imgEl,
            captionCnt;

        for (var i = 0; i < images.length; i++) {
            imgEl = $('<div id="' + images[i].name + '" class="art-gallery-thumb" data-tag="' + images[i].category + '"></div>');
            captionCnt = $('<div class="captionCnt"></div>');
            captionCnt.append('<span class="description">' + images[i].caption + '</span>');
            captionCnt.append('<span class="size">' + images[i].size + '</span>');
            captionCnt.append('<span class="material">' + images[i].material + '</span>');
            captionCnt.append('<span class="tags">' + images[i].category + '</span>');
            imgEl.append(captionCnt);
            imgEl.on('click', this.onThumbClickHandler.bind(this));
            imgEl.attr('style', 'background-image: url(images/' + images[i].name + ')');
            galleryEl.append(imgEl);
        }

        $('.captionCnt').on('click', function (e) {
            e.preventDefault();
            if (e.target.className === 'tag') {
                $(e.target).trigger('custom');
            }
            return false;
        });

        $('.tag').on('custom', this.onTagClickHandler.bind(this));
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

    onTagClickHandler: function onTagClickHandler(e) {
        this.filterImagesByTag(e.currentTarget.dataset.tag);
    },

    filterImagesByTag: function filterImagesByTag(tag) {
        var images = $('.art-gallery-thumb');

        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            if (img.dataset.tag.indexOf(tag) === -1) {
                $(img).addClass('hidden');
            } else {
                $(img).removeClass('hidden');
            }
        }
    },

    loadConfig: function loadConfig(callback) {
        $.getJSON('./config.json').done(function (data) {
            if (data) {
                callback(data);
            }
        });
    }
}).init();

