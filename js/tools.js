$(document).ready(function() {

    $('.page-link').click(function(e) {
        var curBlock = $(this.hash);
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
            e.preventDefault();
        }
    });

    $('.header-search-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        $('html').addClass('header-search-open');
        e.preventDefault();
    });

    $('.header-search-close').click(function(e) {
        $('html').removeClass('header-search-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('header').length == 0) {
            $('html').removeClass('header-search-open');
        }
    });

    $('.welcome-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        arrows: false,
        dots: false
    });

    $('.main-block .speakers').each(function() {
        var curBlock = $(this).parent();
        var curSize = 8;
        if ($(window).width() < 768) {
            curSize = 6;
        }
        if (curBlock.find('.speaker').length > curSize) {
            curBlock.find('.speakers-more').addClass('visible');
        }
    });

    $('.speakers-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.main-block');
        var countItems = curBlock.find('.speaker').length;
        var countVisible = curBlock.find('.speaker:visible').length;
        var curSize = 8;
        if ($(window).width() < 768) {
            curSize = 6;
        }
        countVisible += curSize;
        if (countVisible >= countItems) {
            curBlock.find('.speakers-more').removeClass('visible');
        }
        curBlock.find('.speaker:lt(' + countVisible + ')').addClass('visible');
        e.preventDefault();
    });

    $('.partners-group-list').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            adaptiveHeight: true,
            fade: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false
                    }
                }
            ]
        };
        if (curGallery.next().hasClass('gallery-preview')) {
            options.dots = false;
        }
        curGallery.slick(
            options
        ).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
            if (curGallery.next().hasClass('gallery-preview')) {
                curGallery.next().find('.gallery-preview-item').removeClass('active');
                curGallery.next().find('.gallery-preview-item').eq(nextSlide).addClass('active');
            }
        }).on('setPosition', function(event, slick) {
            if (curGallery.next().hasClass('gallery-preview')) {
                var currentSlide = curGallery.slick('slickCurrentSlide');
                curGallery.next().find('.gallery-preview-item').removeClass('active');
                curGallery.next().find('.gallery-preview-item').eq(currentSlide).addClass('active');
            }
        });

        if (curGallery.next().hasClass('gallery-preview')) {
            var galleryPreview = curGallery.next();
            galleryPreview.mCustomScrollbar({
                axis: 'x'
            });
            galleryPreview.find('.gallery-preview-item a').click(function(e) {
                var curIndex = galleryPreview.find('.gallery-preview-item').index($(this).parent());
                curGallery.slick('slickGoTo', curIndex);
                e.preventDefault();
            });
        }
    });

    $('.main-archive-tabs-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.main-archive-tabs-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.main-archive-tabs-menu-item').index(curItem);
            $('.main-archive-tabs-content.active').removeClass('active');
            $('.main-archive-tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    var $grid = $('.photo-gallery').masonry({
        itemSelector: '.photo-gallery-item'
    });
    $('.photo-gallery img').one('load', function() {
         $grid.masonry('layout');
    });

    $('.photo-gallery-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.main-block');
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            curBlock.find('.photo-gallery').append();
            $(html).find('.photo-gallery-item').each(function() {
                var elem = $(this);
                $grid.masonry().append(elem).masonry('appended', elem).masonry();
                curBlock.find('.photo-gallery img').one('load', function() {
                     $grid.masonry('layout');
                });
            });
            if ($(html).find('.photo-gallery-more').length == 1) {
                curBlock.find('.photo-gallery-more a').attr('href', $(html).find('.photo-gallery-more a').attr('href'));
            } else {
                curBlock.find('.photo-gallery-more').remove();
            }
        });
        $('.photos-more').remove();
        e.preventDefault();
    });

    $('.speaker').each(function() {
        var curItem = $(this);
        curItem.find('.speaker-inner').append('<div class="speaker-detail"><div class="speaker-name">' + curItem.find('.speaker-name').html() + '</div><div class="speaker-text">' + curItem.find('.speaker-text').html() + '</div></div>');
    });

    $('body').on('click', '.speakers-container .pager a', function(e) {
        $('.speakers-container .pager a.active').removeClass('active');
        $(this).addClass('active');
        filterSpeakers();
        e.preventDefault();
    });

    $('body').on('change', '.speakers-filter-item input', function(e) {
        filterSpeakers();
        e.preventDefault();
    });

    $('body').on('click', '.speakers-filter-group-header', function(e) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.speakers-filter-group-all a', function(e) {
        $(this).parent().parent().toggleClass('all');
        e.preventDefault();
    });

    $('.speakers-filter-group-all').each(function() {
        var curBlock = $(this).parent();
        if (curBlock.find('> .speakers-filter-item').length > 6) {
            $(this).addClass('visible');
            $(this).find('em').html(curBlock.find('> .speakers-filter-item').length - 6);
        }
    });

    $('.speakers-filter-reset a').click(function(e) {
        $('.speakers-filter-item input').prop('checked', false);
        filterSpeakers();
        e.preventDefault();
    });

    $('body').on('click', '.speaker-card-descr-more a', function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.photo-gallery-item-inner a', function(e) {
        var curLink = $(this);
        var curItem = curLink.parents().filter('.photo-gallery-item');
        var curGallery = curItem.parents().filter('.photo-gallery');
        var curIndex = curGallery.find('.photo-gallery-item').index(curItem);

        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-photo-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        var windowHTML =    '<div class="window-photo">';

        windowHTML +=           '<div class="window-photo-preview">' +
                                    '<div class="window-photo-preview-inner">' +
                                        '<div class="window-photo-preview-list">';

        var galleryLength = curGallery.find('.photo-gallery-item-inner').length;
        for (var i = 0; i < galleryLength; i++) {
            var curTitle = '';
            var curGalleryItem = curGallery.find('.photo-gallery-item-inner').eq(i);
            windowHTML +=                   '<div class="window-photo-preview-list-item"><a href="#"><img src="' + curGalleryItem.find('img').attr('src') + '" alt="" /></a></div>';
        }
        windowHTML +=                   '</div>' +
                                    '</div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-download download" target="_blank"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-download"></use></svg></a>';
        windowHTML +=           '<div class="window-photo-social">';
        windowHTML +=               '<div class="window-photo-social-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share"></use></svg></div>';
        windowHTML +=               '<div class="window-photo-social-window">';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-link"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-fb"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-fb"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-vk"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-vk"></use></svg></a>';
        windowHTML +=               '</div>';
        windowHTML +=           '</div>';

        windowHTML +=           '<div class="window-photo-slider">' +
                                    '<div class="window-photo-slider-list">';

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.photo-gallery-item').eq(i);
            windowHTML +=               '<div class="window-photo-slider-list-item">' +
                                            '<div class="window-photo-slider-list-item-inner"><img src="' + pathTemplate + 'images/loading.gif" data-src="' + curGalleryItem.find('.photo-gallery-item-inner a').attr('href') + '" alt="" /></div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                '</div>';

        windowHTML +=       '</div>';

        $('.window-photo').remove();
        $('body').append(windowHTML);

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

        $('.window-photo').each(function() {
            var marginPhoto = 166;
            if ($(window).width() < 1200) {
                marginPhoto = 253;
            }
            var newHeight = marginPhoto;
            $('.window-photo-slider-list-item-inner').css({'height': 'calc(100vh - ' + newHeight + 'px)', 'line-height': 'calc(100vh - ' + newHeight + 'px)'});
        });

        if ($(window).width() > 1199) {
            $('.window-photo-preview-inner').mCustomScrollbar({
                axis: 'y',
                scrollButtons: {
                    enable: true
                }
            });
        } else {
            $('.window-photo-preview-inner').mCustomScrollbar({
                axis: 'x',
                scrollButtons: {
                    enable: true
                }
            });
        }

        $('.window-photo-slider-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            dots: false,
            speed: 250,
            initialSlide: curIndex,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            var currentSlide = $('.window-photo-slider-list').slick('slickCurrentSlide');
            $('.window-photo-preview-list-item.active').removeClass('active');
            $('.window-photo-preview-list-item').eq(currentSlide).addClass('active');
            $('.window-photo-preview-inner').mCustomScrollbar('scrollTo', $('.window-photo-preview-list-item').eq(currentSlide));
            $('.window-photo-download').attr('href', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
            var curIMG = $('.window-photo-slider-list-item').eq(currentSlide).find('img');
            if (curIMG.attr('src') !== curIMG.attr('data-src')) {
                var newIMG = $('<img src="" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                $('body').append(newIMG);
                newIMG.one('load', function(e) {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    newIMG.remove();
                });
                newIMG.attr('src', curIMG.attr('data-src'));
                window.setTimeout(function() {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    if (newIMG) {
                        newIMG.remove();
                    }
                }, 3000);
            }
        });

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-preview-list-item a', function(e) {
        var curIndex = $('.window-photo-preview-list-item').index($(this).parent());
        $('.window-photo-slider-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('body').on('click', '.window-photo-close', function(e) {
        $('.window-photo').remove();
        $('html').removeClass('window-photo-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-photo').length > 0) {
                $('.window-photo-close').trigger('click');
            }
        }
    });

    $('body').on('click', '.video-gallery-item a', function(e) {
        var curLink = $(this);
        var curItem = curLink.parents().filter('.video-gallery-item');
        var curGallery = curItem.parents().filter('.video-gallery');
        if (curGallery.length == 0 || curItem.parents().filter('.main-block').length == 1) {
            curGallery = curItem.parents().filter('.main-block');
        }
        var curIndex = curGallery.find('.video-gallery-item').index(curItem);

        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-video-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        var windowHTML =    '<div class="window-video">';

        windowHTML +=           '<a href="#" class="window-video-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';
        windowHTML +=           '<div class="window-video-social">';
        windowHTML +=               '<div class="window-video-social-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share"></use></svg></div>';
        windowHTML +=               '<div class="window-video-social-window">';
        windowHTML +=                   '<a href="#" class="window-video-social-item window-video-social-item-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-link"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-video-social-item window-video-social-item-fb"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-fb"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-video-social-item window-video-social-item-vk"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-vk"></use></svg></a>';
        windowHTML +=               '</div>';
        windowHTML +=           '</div>';

        windowHTML +=           '<div class="window-video-slider">' +
                                    '<div class="window-video-slider-list">';

        var galleryLength = curGallery.find('.video-gallery-item').length;
        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.video-gallery-item').eq(i);
            windowHTML +=               '<div class="window-video-slider-list-item">' +
                                            '<div class="window-video-slider-list-item-inner" data-videourl="' + curGalleryItem.find('a').attr('href') + '"></div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                '</div>';

        windowHTML +=       '</div>';

        $('.window-video').remove();
        $('body').append(windowHTML);

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

        $('.window-video-slider-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            dots: false,
            speed: 250,
            initialSlide: curIndex,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            var currentSlide = $('.window-video-slider-list').slick('slickCurrentSlide');
            $('.window-video-slider-list-item-inner').html('');
            $('.window-video-slider-list-item').eq(currentSlide).find('.window-video-slider-list-item-inner').each(function() {
                $(this).html('<iframe width="560" height="315" src="' + $(this).attr('data-videourl') + '?rel=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            });
        });

        e.preventDefault();
    });

    $('body').on('click', '.window-video-close', function(e) {
        $('.window-video').remove();
        $('html').removeClass('window-video-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-video').length > 0) {
                $('.window-video-close').trigger('click');
            }
        }
    });

    $('.award-video-preview').click(function(e) {
        $(this).parent().html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        e.preventDefault();
    });

    $('.award-nominant-header').click(function(e) {
        var curItem = $(this).parent();
        curItem.toggleClass('open');
        curItem.find('.award-nominant-container').slideToggle();
    });

    var clipboard = new ClipboardJS('.analytics-location-info-coords span');
    clipboard.on('success', function(e) {
        alert('Координаты скопированы в буфер');
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.analytics-library-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.analytics-library');
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            curBlock.find('.analytics-library-list').append($(html).find('.analytics-library-list').html());
            if ($(html).find('.analytics-library-more').length == 1) {
                curBlock.find('.analytics-library-more a').attr('href', $(html).find('.analytics-library-more a').attr('href'));
            } else {
                curBlock.find('.analytics-library-more').remove();
            }
        });
        e.preventDefault();
    });

    $('.analytics-programm-tabs-menu a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.analytics-programm-tabs-menu li.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.analytics-programm-tabs-menu li').index(curItem);
            $('.analytics-programm-tab.active').removeClass('active');
            $('.analytics-programm-tab').eq(curIndex).addClass('active');
            $('.analytics-programm-tabs-menu').removeClass('open');
            $('.analytics-programm-tabs-menu-current span').html($(this).html());
        }
        e.preventDefault();
    });

    $('.analytics-programm-tabs-menu-current').click(function() {
        $('.analytics-programm-tabs-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.analytics-programm-tabs-menu').length == 0) {
            $('.analytics-programm-tabs-menu').removeClass('open');
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-input span').html(curName).addClass('full');
        } else {
            curField.find('.form-file-input span').html(curField.find('.form-file-input span').attr('data-placeholder')).removeClass('full');
        }
    });

    $('.event-header-text-more a').click(function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    $('.event-tabs-menu a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.event-tabs-menu li.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.event-tabs-menu li').index(curItem);
            $('.event-tab.active').removeClass('active');
            $('.event-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    redrawProgramm();

    $('.programm-filter-btn a').click(function(e) {
        $('html').toggleClass('programm-filter-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.programm-filter').length == 0 && $(e.target).parents().filter('.select2-container').length == 0) {
            $('html').removeClass('programm-filter-open');
        }
    });

    $('.programm-filter-window-checkboxes').each(function() {
        var curWrapper = $(this).parent();
        $(this).mCustomScrollbar({
            axis: 'y',
            callbacks: {
                onInit: function() {
                    curWrapper.removeClass('with-top');
                    curWrapper.addClass('with-bottom');
                },

                whileScrolling: function() {
                    if (this.mcs.topPct == 100) {
                        curWrapper.removeClass('with-bottom');
                    } else {
                        curWrapper.addClass('with-bottom');
                    }

                    if (this.mcs.topPct == 0) {
                        curWrapper.removeClass('with-top');
                    } else {
                        curWrapper.addClass('with-top');

                    }
                }
            }
        });
    });

    $('.programm-filter-window-select .form-select select').change(function() {
        updateProgrammFilter();
    });

    $('.programm-filter-window-checkboxes .form-checkbox input').change(function() {
        updateProgrammFilter();
    });

    $('.programm-filter').each(function() {
        updateProgrammFilter();
    });

    $('body').on('click', '.programm-filter-param a', function(e) {
        var curLink = $(this);
        var curType = curLink.attr('data-type');
        if (curType == 'select') {
            $('.programm-filter-window-select .form-select select[name="' + curLink.attr('data-name') + '"] option:selected').prop('selected', false);
            $('.programm-filter-window-select .form-select select[name="' + curLink.attr('data-name') + '"]').trigger('change');
        }
        if (curType == 'checkbox') {
            $('.programm-filter-window-checkboxes .form-checkbox input[name="' + curLink.attr('data-name') + '"]').prop('checked', false).trigger('change');
        }
        e.preventDefault();
    });

    $('.programm-dates a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.programm-dates li.active').removeClass('active');
            curLi.addClass('active');
            redrawProgramm();
        }
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.nav ul li a').click(function(e) {
        if ($(window).width() < 1200) {
            if ($(this).parent().find('ul').length != 0) {
                $(this).parent().toggleClass('open');
                e.preventDefault();
            }
        }
    });

    $('.footer-menu .footer-title, .footer-archive-title').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('.event-tab-title').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

});

function redrawProgramm() {
    $('.programm-container').each(function() {
        var curData = null;
        var curDate = $('.programm-dates li.active a').attr('data-date');

        for (var i = 0; i < programmData.length; i++) {
            if (programmData[i].date == curDate) {
                curData = programmData[i].data;
            }
        }

        $('.programm-halls-inner').html('');
        $('.programm-timescale').html('');
        $('.programm-list').html('');

        if (curData != null) {

            var countHalls = curData.length;

            var minHour = 23;
            var maxHour = 0;
            for (var i = 0; i < countHalls; i++) {
                for (var j = 0; j < curData[i].events.length; j++) {
                    var curEvent = curData[i].events[j];
                    var curHour = Number(curEvent.start.substring(0, 2));
                    if (curHour < minHour) {
                        minHour = curHour;
                    }
                    curHour = Number(curEvent.end.substring(0, 2));
                    if (curHour > maxHour) {
                        maxHour = curHour;
                    }
                }
            }
            maxHour++;
            var countHour = maxHour - minHour;
            var currentHour = 0;
            for (var i = minHour; i < maxHour; i++) {
                $('.programm-timescale').append('<div class="programm-timescale-item"><span>' + ('0' + i).substr(-2) + ':00</span></div>');
                currentHour++;
            }
            var scheduleHeight = $('.programm-timescale').height();

            for (var i = 0; i < countHalls; i++) {
                $('.programm-halls-inner').append('<div class="programm-hall" style="width:' + (100 / countHalls) + '%">' + curData[i].hall + '</div>');
                var hallHTML =  '<div class="programm-list-hall" style="width:' + (100 / countHalls) + '%; height:' + scheduleHeight + 'px">';
                for (var j = 0; j < curData[i].events.length; j++) {
                    var curEvent = curData[i].events[j];

                    var startHour = Number(curEvent.start.substr(0, 2));
                    var startMinutes = Number(curEvent.start.substr(-2));
                    var eventTop = (((startHour - minHour) + startMinutes / 60) / countHour) * 100;
                    var endHour = Number(curEvent.end.substr(0, 2));
                    var endMinutes = Number(curEvent.end.substr(-2));
                    var eventBottom = (((endHour - minHour) + endMinutes / 60) / countHour) * 100;
                    var eventHeight = eventBottom - eventTop;

                    var classType = 'programm-list-item-type-' + curEvent.type;
                    var classTotal = '';
                    var styleTotal = '';
                    if (typeof(curEvent.total) != 'undefined' && curEvent.total) {
                        classTotal = 'programm-list-item-total';
                        var widthTotal = 0;
                        for (var m = i - 1; m > -1; m--) {
                            for (var k = 0; k < curData[m].events.length; k++) {
                                var prevEvent = curData[m].events[k];
                                var prevStartHour = Number(prevEvent.start.substr(0, 2));
                                var prevStartMinutes = Number(prevEvent.start.substr(-2));
                                if (startHour == prevStartHour && startMinutes == prevStartMinutes && typeof(prevEvent.total) != 'undefined' && prevEvent.total) {
                                    widthTotal += 1;
                                    $('.programm-list-item-total[data-start="' + prevEvent.start + '"]').addClass('hidden');
                                }
                            }
                        }
                        if (widthTotal > 0) {
                            styleTotal = 'margin-left: -' + (widthTotal * 100) + '%';
                        }
                    }
                    hallHTML +=         '<div class="programm-list-item ' + classType + ' ' + classTotal + '" style="top:' + eventTop + '%; height:' + eventHeight + '%; ' + styleTotal + '" data-start="' + curEvent.start + '" data-speaker="' + curEvent.speaker + '" data-section="' + curEvent.section + '">';
                    hallHTML +=             '<a href="' + curEvent.url + '">';
                    hallHTML +=                 '<div class="programm-list-item-inner">';
                    hallHTML +=                     '<div class="programm-list-item-content">';
                    if (typeof(curEvent.total) != 'undefined' && curEvent.total) {
                        if (typeof(curEvent.text) != 'undefined') {
                            hallHTML +=                 '<div class="programm-list-item-type">' + curEvent.text + '</div>';
                        }
                        hallHTML +=                     '<div class="programm-list-item-title">' + curEvent.title + '</div>';
                        hallHTML +=                     '<div class="programm-list-item-time">' + curEvent.start + ' – ' + curEvent.end + '</div>';
                    } else {
                        hallHTML +=                     '<div class="programm-list-item-time">' + curEvent.start + ' – ' + curEvent.end + '</div>';
                        hallHTML +=                     '<div class="programm-list-item-type">' + curEvent.text + '</div>';
                        hallHTML +=                     '<div class="programm-list-item-title">' + curEvent.title + '</div>';
                    }
                    hallHTML +=                     '</div>';
                    hallHTML +=                 '</div>';
                    hallHTML +=             '</a>';
                    hallHTML +=         '</div>';
                }
                hallHTML +=         '</div>';
                hallHTML +=     '</div>';
                $('.programm-list').append(hallHTML);
            }

            $(window).trigger('resize');
        }

    });
}

function updateProgrammFilter() {
    var paramsHTML = '';

    $('.programm-filter-window-select .form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.val() != '') {
            paramsHTML += '<div class="programm-filter-param">' + curSelect.val() + '<a href="#" data-type="select" data-name="' + curSelect.attr('name') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#programm-filter-param-remove"></use></svg></a></div>';
        }
    });

    $('.programm-filter-window-checkboxes .form-checkbox input:checked').each(function() {
        var curInput = $(this);
        paramsHTML += '<div class="programm-filter-param">' + curInput.parent().find('span').html() + '<a href="#" data-type="checkbox" data-name="' + curInput.attr('name') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#programm-filter-param-remove"></use></svg></a></div>';
    });

    $('.programm-filter-params').html(paramsHTML);

    if (paramsHTML == '') {
        $('.programm-list-item.unfilter').removeClass('unfilter');
    } else {
        $('.programm-list-item').addClass('unfilter');

        $('.programm-filter-window-select-speakers .form-select select').each(function() {
            var curSelect = $(this);
            if (curSelect.val() != '') {
                $('.programm-list-item[data-speaker="' + curSelect.val() + '"]').removeClass('unfilter');
            }
        });

        $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
            var curInput = $(this);
            $('.programm-list-item-type-' + curInput.val()).removeClass('unfilter');
        });

        $('.programm-filter-window-checkboxes-sections .form-checkbox input:checked').each(function() {
            var curInput = $(this);
            $('.programm-list-item[data-section="' + curInput.val() + '"]').removeClass('unfilter');
        });

        var curTop = 9999;
        $('.programm-list-item:not(.unfilter, .hidden)').each(function() {
            console.log($(this).offset().top);
            if ($(this).offset().top < curTop) {
                curTop = $(this).offset().top;
            }
        });
        if (curTop != 9999) {
            $('html, body').animate({'scrollTop': curTop - $('.programm-ctrl-inner').outerHeight()});
        }
    }
}

$(window).on('load resize', function() {
    $('.programm-container').each(function() {
        var isCorrectHeight = false;
        while (!isCorrectHeight) {
            isCorrectHeight = true;
            $('.programm-list-item').each(function() {
                var curItem = $(this);
                if (curItem.find('a').outerHeight() < curItem.find('.programm-list-item-inner').outerHeight()) {
                    isCorrectHeight = false;
                }
            });
            if (!isCorrectHeight) {
                var curHeight = $('.programm-timescale-item').eq(0).height();
                curHeight += 10;
                $('.programm-timescale-item').height(curHeight);
                var scheduleHeight = $('.programm-timescale').height();
                $('.programm-list-hall').height(scheduleHeight);
            }
        }
    });
});

function filterSpeakers() {
    $('.speakers-container').addClass('loading');
    var curForm = $('.speakers-filter form');
    var curData = curForm.serialize();
    curData += '&page=' + $('.pager a.active').attr('data-value');
    $.ajax({
        type: 'POST',
        url: curForm.attr('action'),
        dataType: 'html',
        data: curData,
        cache: false
    }).done(function(html) {
        $('.speakers-container .speakers').html($(html).find('.speakers').html())
        $('.speakers-container .pager').html($(html).find('.pager').html())
        $('.speakers-container').removeClass('loading');

        $('.speaker').each(function() {
            var curItem = $(this);
            curItem.find('.speaker-inner').append('<div class="speaker-detail"><div class="speaker-name">' + curItem.find('.speaker-name').html() + '</div><div class="speaker-text">' + curItem.find('.speaker-text').html() + '</div></div>');
        });
    });
}

$(window).on('load resize', function() {
    $('.speaker-card-descr-text').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('open with-more');
        if (curBlock.height() < curBlock.find('.speaker-card-descr-text-inner').height()) {
            curBlock.addClass('with-more');
        }
    });

    $('.event-header-text-container').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('open with-more');
        if (curBlock.height() < curBlock.find('.event-header-text-inner').height()) {
            curBlock.addClass('with-more');
        }
    });

    $('.analytics-team-prev, .analytics-team-next').each(function() {
        $('.window').append('<div class="window-size-test" style="position:absolute; left:0; top:0; right:0; height:1px;"></div>');
        $(this).css({'left': $('.window-size-test').width() / 2});
        $('.window-size-test').remove();
    });

    $('.analytics-menu').each(function() {
        if ($(window).width() > 1199) {
            $('.analytics-menu').mCustomScrollbar('destroy');
        } else {
            $('.analytics-menu').mCustomScrollbar({
                axis: 'x'
            });
        }
    });

    if ($('.table-scroll').length > 0) {
        if ($(window).width() < 1200) {
            $('.table-scroll').mCustomScrollbar({
                axis: 'x',
                scrollButtons: {
                    enable: true
                }
            });
        } else {
            if ($('.table-scroll').length > 0) {
                $('.table-scroll').mCustomScrollbar('destroy');
            }
        }
    }
});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }
    }

    $('.programm-ctrl-wrapper').each(function() {
        if (windowScroll >= $('.programm-ctrl-wrapper').offset().top + 97) {
            $('.programm-ctrl-wrapper').addClass('fixed');
        } else {
            $('.programm-ctrl-wrapper').removeClass('fixed');
        }
    });
});

function initForm(curForm) {
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input input').blur(function(e) {
        $(this).val($(this).val()).change();
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }
        if (curSelect.prop('multiple')) {
            options['closeOnSelect'] = false;
        }

        if (curSelect.parents().filter('.window').length == 1) {
            options['dropdownParent'] = $('.window-content');
        }

        curSelect.select2(options);
        curSelect.on('select2:selecting', function (e) {
            if (curSelect.prop('multiple')) {
                var $searchfield = $(this).parent().find('.select2-search__field');
                $searchfield.val('').trigger('focus');
            }
        });
        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.validate({
        ignore: ''
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        $(window).trigger('resize');

    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}