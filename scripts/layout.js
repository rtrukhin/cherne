'use strict';

define([
    "../scripts/utility",
    "../scripts/data"
], function(util, Data) {
    var Layout = function Layout() {
        return (function() {
            return {
                create: function create() {
                    this.createMainStructure();
                    this.createHeader();
                    this.updateFooter();
                    this.createFullGallery();
                    this.createModalDialog();
                },
                createMainStructure: function createMainStructure() {
                    var body = $('body');

                    body.append(util.createEl('header', {
                        class: 'art-header'
                    }));
                    body.append(util.createEl('article', {
                        class: 'art-gallery'
                    }));
                    body.append(util.createEl('footer', {
                        class: 'art-footer'
                    }));
                    body.append(util.createEl('div', {
                        class: 'art-modal-popup'
                    }));
                },

                createModalDialog: function createModalDialog() {
                    var dialogWrapper = $('.art-modal-popup'),
                        title = util.createEl('div', {
                            class: 'title-txt'
                        }, 'Title'),
                        content = util.createEl('div', {
                            class: 'content'
                        }),
                        closeBtn = util.createEl('div', {
                            class: 'close-btn'
                        }, 'X');

                    closeBtn.on('click', $.proxy(this.hideModalDialog, this));
                    dialogWrapper.append([title, closeBtn, content]);
                    dialogWrapper.hide();
                },

                createHeader: function createHeader() {
                    var header = $('header'),
                        categories = Data.getImageCategories(),
                        logoWrapper = util.createEl('figure', {
                            class: 'logo'
                        }),
                        logo = util.createEl('img', {
                            id: 'logo',
                            src: 'images/logo.jpg'
                        }),
                        nav = util.createEl('nav'),
                        breadcrumbWrapper = util.createEl('ul'),
                        aboutLink = util.createEl('li', {
                            id: 'about',
                            class: 'breadcrumb',
                        }, 'Ciricullum Vitae'),
                        showcase = util.createEl('li', {
                            id: 'showcase',
                            class: 'breadcrumb',
                        }, 'Open Showcase');

                    aboutLink.on('click', $.proxy(this.onBreadcrumbClickHandler, this));
                    showcase.on('click', $.proxy(function() {
                        $(this).trigger('openShowcase');
                    }, this));

                    header.append(logoWrapper.append(logo));
                    categories.forEach(function(elem) {
                        var breadcrumb = util.createEl('li', {
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
                        imgWrapper = util.createEl('figure', {
                            class: 'art-image-wrapper squared',
                            'data-category': img.category
                        });
                        imgCaption = util.createEl('figcaption', {
                            class: 'art-image-caption'
                        }, img.caption);
                        imgEl = util.createEl('img', {
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