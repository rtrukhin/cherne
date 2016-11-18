'use strict';

define([
    "../scripts/data"
], function (Data) {
    var Layout = function Layout() {
        return (function () {
            return {
                createEl: function createEl(elemName, attr, text) {
                    var el = $(document.createElement(elemName));

                    for (var key in attr) {
                        el.attr(key, attr[key]);
                    }

                    el.text(text || '');
                    return el;
                },
                createLayout: function createLayout() {
                    this.createMainStructure();
                    this.createHeader();
                    this.updateFooter();
                    this.createFullGallery();
                    this.createModalDialog();
                },
                createMainStructure: function createMainStructure() {
                    var body = $('body');

                    body.append(this.createEl('header', {
                        class: 'art-header'
                    }));
                    body.append(this.createEl('article', {
                        class: 'art-gallery'
                    }));
                    body.append(this.createEl('footer', {
                        class: 'art-footer'
                    }));
                    body.append(this.createEl('div', {
                        class: 'art-modal-popup'
                    }));
                },

                createModalDialog: function createModalDialog() {
                    var dialogWrapper = $('.art-modal-popup'),
                        title = this.createEl('div', {
                            class: 'title-txt'
                        }, 'Title'),
                        content = this.createEl('div', {
                            class: 'content'
                        }),
                        closeBtn = this.createEl('div', {
                            class: 'close-btn'
                        }, 'X');

                    closeBtn.on('click', $.proxy(this.hideModalDialog, this));
                    dialogWrapper.append([title, closeBtn, content]);
                },

                createHeader: function createHeader() {
                    var header = $('header'),
                        categories = Data.getImageCategories(),
                        logoWrapper = this.createEl('figure', {
                            class: 'logo'
                        }),
                        logo = this.createEl('img', {
                            id: 'logo',
                            src: 'images/logo.jpg'
                        }),
                        nav = this.createEl('nav'),
                        breadcrumbWrapper = this.createEl('ul'),
                        aboutLink = this.createEl('li', {
                            id: 'about',
                            class: 'breadcrumb',
                        }, 'Ciricullum Vitae'),
                        showcase = this.createEl('li', {
                            id: 'showcase',
                            class: 'breadcrumb',
                        }, 'Open Showcase');

                    aboutLink.on('click', $.proxy(this.onBreadcrumbClickHandler, this));
                    showcase.on('click', $.proxy(function () {
                        $(this).trigger('openShowcase');
                    }, this));

                    header.append(logoWrapper.append(logo));
                    categories.forEach(function (elem) {
                        var breadcrumb = this.createEl('li', {
                            class: 'breadcrumb',
                            'data-category': elem
                        }, elem);
                        breadcrumb.on('click', $.proxy(this.onBreadcrumbClickHandler, this));
                        breadcrumbWrapper.append(breadcrumb);
                    }, this);
                    breadcrumbWrapper.append(aboutLink);
                    breadcrumbWrapper.append(showcase);
                    header.append(breadcrumbWrapper);
                },

                createImageElements: function createImageElements() {
                    var images = Data.getImages(),
                        img,
                        imgWrapper,
                        imgCaption,
                        imgEl,
                        res = [];
                    for (var i = 0; i < images.length; i++) {
                        img = images[i];
                        imgWrapper = this.createEl('figure', {
                            class: 'art-image-wrapper squared',
                            'data-category': img.category
                        });
                        imgCaption = this.createEl('figcaption', {
                            class: 'art-image-caption'
                        }, img.caption);
                        imgEl = this.createEl('img', {
                            class: 'art-image',
                            src: 'images/' + img.name
                        });

                        imgWrapper.on('click', $.proxy(this.onImageClickHandler, this));
                        imgWrapper.append([imgEl, imgCaption]);

                        res.push(imgWrapper);
                    }

                    return res;
                },

                createFullGallery: function createFullGallery() {
                    var galleryEl = $('.art-gallery'),
                        images = this.createImageElements();

                    for (var i = 0; i < images.length; i++) {
                        var img = images[i];
                        galleryEl.append(img);
                    }

                    this.hideAllImages();
                },

                onBreadcrumbClickHandler: function onBreadcrumbClickHandler(event) {
                    var category = $(event.target).data('category');
                    this.filterImagesByCategory(category);
                },

                onImageClickHandler: function onImageClickHandler(event) {
                    this.showFullSizeImage(event.currentTarget);
                },

                showFullSizeImage: function showFullSizeImage(image) {
                    this.hideAllImages();
                    $(image).removeClass('squared');
                    $(image).show();
                    this.showModalDialog({
                        content: image,
                        sourceEl: $('.art-gallery'),
                        titleTxt: $(image).find('figcaption').text()
                    });
                },

                showModalDialog: function showModalDialog(dialogVO) {
                    var popup = $('.art-modal-popup');
                    popup.attr('data-source', dialogVO.sourceEl.selector);
                    popup.find('.content').append(dialogVO.content);
                    popup.find('.title-txt').text(dialogVO.titleTxt);
                },

                hideModalDialog: function hideModalDialog() {
                    var popup = $('.art-modal-popup'),
                        copyToEl = popup.data('source'),
                        popupContent = popup.find('.content').children()[0],
                        popupTitle = popup.find('.title-txt');

                    $(copyToEl).append(popupContent);
                    popupTitle.text();
                    this.showAllImages();
                },

                filterImagesByCategory: function filterImagesByCategory(category) {
                    this.hideAllImages();
                    $('.art-image-wrapper[data-category=' + category + ']').show();
                },

                hideAllImages: function hideAllImages() {
                    $('.art-image-wrapper').hide();
                },

                showAllImages: function showAllImages() {
                    $('.art-image-wrapper').show();
                },

                updateFooter: function updateFooter() {
                    $('footer').html(new Date().getFullYear() + '&nbsp;&copy;&nbsp;' + 'Андрій Чернець');
                }
            }
        })();
    };

    Layout.EVENTS = {
        openShowcase: 'openShowcase'
    };

    return Layout;
});