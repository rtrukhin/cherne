/**
 * Created by rtrukh on 26.05.2016.
 */

(function () {
    window.gallery = (function () {
        return {
            config: null,
            detectIE: function detectIE(ua) {
                return /(msie|trident |rv:).?(10|11\.\d)/i.test(ua);
            },
            loadConfig: function loadConfig(callback) {
                $.getJSON('./config.json').done(function (data) {
                    if (data) {
                        callback(data);
                    }
                });
            },
            init: function init() {
                if (this.detectIE(navigator.userAgent)) {
                    document.body.innerHTML = '<p class="browserhappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your ' +
                        'browser</a> to improve your experience.</p>';
                } else {
                    this.createStructure();
                    this.loadConfig(this.onConfigLoaded.bind(this));
                }
            },
            onConfigLoaded: function onConfigLoaded(data) {
                this.updateGallery(data);
                this.updateHeader(data);
                this.showSplashScreen();
            },
            showSplashScreen: function showSplashScreen() {
                this.showPopup('Андрій Чернець', '0.jpg');
            },
            createStructure: function createStructure() {
                var header = this.createHtmlEl('header', 'art-header'),
                    gallery = this.createHtmlEl('section', 'art-header'),
                    footer = this.createHtmlEl('footer', 'art-header'),
                    popup = this.createHtmlEl('div', 'art-modal-popup');

                $('body')
                    .append(header)
                    .append(gallery)
                    .append(footer)
                    .append(popup);
            },
            createHtmlEl: function createHtmlEl(tagName, className) {
                var el = $(tagName);
                el.addClass(className);
                return el;
            },
            updateHeader: function updateHeader(data) {
                var me = this,
                    header = $('header'),
                    nav = $('<div class="nav"></div>'),
                    tag;

                function prepareTags(images) {
                    var tags = [];

                    for (var i = 0; i < images.length; i++) {
                        for (var j = 0; j < images[i].tags.length; j++) {
                            tag = images[i].tags[j];
                            if (!tags.includes(tag)) {
                                tags.push(tag);
                                nav.append('<a href="#" class="breadcrumb" data-tag="' + tag + '">' + tag + '</a>');
                            }
                        }
                    }
                }

                prepareTags(data.images);

                nav.append('<a href="#" id="about">Про мене</a>');
                header.append(nav);

                $('.breadcrumb').on('click', this.onTagClickHandler.bind(this));

                $('#about').on('click', function () {
                    me.showPopup('about.html');
                });
            },

            updateGallery: function updateGallery(data) {
                var images = data.images,
                    galleryEl = $('#art-gallery'),
                    imgEl,
                    captionCnt;

                function createTags(tags) {
                    var res = '',
                        i;
                    for (i = 0; i < tags.length; i++) {
                        res += '<a href="#" class="tag" data-tag="' + tags[i] + '">' + tags[i] + '</a>';
                    }
                    return res;
                }

                for (var i = 0; i < images.length; i++) {
                    imgEl = $('<div id="' + images[i].name + '" class="art-gallery-thumb" data-tag="' + images[i].tags + '"></div>');
                    captionCnt = $('<div class="captionCnt"></div>');
                    captionCnt.append('<span class="description">' + images[i].caption + '</span>');
                    captionCnt.append('<span class="size">' + images[i].size + '</span>');
                    captionCnt.append('<span class="material">' + images[i].material + '</span>');
                    captionCnt.append('<span class="tags">' + createTags(images[i].tags) + '</span>');
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
            }
        };
    })();

    gallery.init();
})();
