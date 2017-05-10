'use strict';

define([
    "../scripts/utility"
], function(util) {
    var Layout = function Layout() {
        return (function() {
            return {
                create: function create(data) {
                    this.createMainStructure();
                    this.createHeader();
                    this.updateFooter();
                    this.createFullGallery(data);
                    this.createModalDialog();
                },
                createMainStructure: function createMainStructure() {
                    var body = $('body');

                    body.append(util.createEl('header', {
                        class: 'art-header'
                    }));
                    body.append(util.createEl('div', {
                        class: 'art-splashscreen',
                        'data-l10n-id': "splash-achernets"
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
                        }, '&otimes;');

                    closeBtn.on('click', $.proxy(this.hideModalDialog, this));
                    dialogWrapper.append([closeBtn, content]);
                    dialogWrapper.hide();
                },

                createHeader: function createHeader() {
                    var header = $('header'),
                        logoWrapper = util.createEl('figure', {
                            class: 'logo'
                        }),
                        logo = util.createEl('img', {
                            id: 'logo',
                            src: 'images/logo.jpg'
                        }),
                        nav = util.createEl('nav'),
                        breadcrumbWrapper = util.createEl('ul'),
                        galleryLink = util.createEl('li', {
                            'data-l10n-id': "header-gallery",
                            class: 'breadcrumb',
                        }),
                        aboutLink = util.createEl('li', {
                            'data-l10n-id': "header-about",
                            class: 'breadcrumb',
                        }),
                        contactsLink = util.createEl('li', {
                            'data-l10n-id': "header-contacts",
                            class: 'breadcrumb',
                        }),
                        engLink = util.createEl('li', {
                            'data-l10n-id': "header-eng",
                            class: 'breadcrumb',
                        }),
                        ukrLink = util.createEl('li', {
                            'data-l10n-id': "header-ukr",
                            class: 'breadcrumb',
                        });

                    galleryLink.on('click', $.proxy(function() {
                        $(Layout).trigger(Layout.EVENTS.openShowcase);
                        this.hideAllImages();
                        $('.art-splashscreen').hide();
                    }, this));
                    aboutLink.on('click', $.proxy(this.showAboutMe, this));
                    contactsLink.on('click', $.proxy(this.showContacts, this));
                    engLink.on('click', function() {
                        document.l10n.requestLanguages(['en-US']);
                    });
                    ukrLink.on('click', function() {
                        document.l10n.requestLanguages(['ua']);
                    });

                    header.append(logoWrapper.append(logo));

                    breadcrumbWrapper.append([galleryLink, aboutLink, contactsLink, engLink, ukrLink]);
                    header.append(breadcrumbWrapper);
                },

                createFullGallery: function createFullGallery(images) {
                    var galleryEl = $('.art-gallery'),
                        img,
                        imgWrapper,
                        imgCaption,
                        imgMaterial,
                        imgSize,
                        imgEl;

                    for (var i = 0; i < images.length; i++) {
                        img = images[i];
                        imgWrapper = util.createEl('figure', {
                            class: 'art-image-wrapper squared',
                            'data-category': img.category
                        });
                        imgCaption = util.createEl('figcaption', {
                            class: 'art-image-caption',
                            'data-l10n-id': img.caption,
                        });
                        imgMaterial = util.createEl('p', {
                            class: 'art-image-material',
                            'data-l10n-id': img.material,
                        });
                        imgSize = util.createEl('p', {
                            class: 'art-image-size',
                            'data-l10n-id': img.size,
                        });
                        imgEl = util.createEl('img', {
                            class: 'art-image',
                            src: 'images/' + img.name
                        });

                        imgWrapper.on('click', $.proxy(this.onImageClickHandler, this));
                        galleryEl.append(imgWrapper.append([imgEl, imgCaption, imgMaterial, imgSize]));
                    }
                    this.hideAllImages();
                },

                showAboutMe: function showAboutMe() {
                    $('.art-modal-popup > .content').load('about.html .art-about');
                    $('.art-modal-popup > .title-txt').text('Про мене');
                    this.showModalDialog();
                },

                showContacts: function showContacts() {
                    $('.art-modal-popup > .content').load('contacts.html .art-contacts');
                    $('.art-modal-popup > .title-txt').text('Контакти');
                    this.showModalDialog();
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
                    if (dialogVO) {
                        popup.find('.content').append(dialogVO.content);
                        popup.find('.title-txt').text(dialogVO.titleTxt);
                    }
                    popup.show();
                },

                hideModalDialog: function hideModalDialog() {
                    var popup = $('.art-modal-popup');

                    popup.find('.title-txt').text('');
                    popup.find('.content').text('');
                    popup.hide();
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
                    $('footer').html(new Date().getFullYear());
                    $('footer').append('&nbsp;&copy;&nbsp;');
                    $('footer').append(util.createEl('span', {
                        'data-l10n-id': 'splash-achernets'
                    }));

                }
            }
        })();
    };

    Layout.EVENTS = {
        openShowcase: 'openShowcase'
    };

    return Layout;
});