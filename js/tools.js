$(document).ready(function() {

    $('.page-link').click(function(e) {
        var curBlock = $(this.hash);
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
            e.preventDefault();
        }
    });

    $('.header-search-link').click(function(e) {
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
        dots: true
    });

    $('.main-block .speakers').each(function() {
        var curBlock = $(this).parent();
        if (curBlock.find('.speaker').length > 8) {
            curBlock.find('.speakers-more').addClass('visible');
        }
    });

    $('.speakers-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.main-block');
        var countItems = curBlock.find('.speaker').length;
        var countVisible = curBlock.find('.speaker:visible').length;
        countVisible += 8;
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
        dots: false
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
            dots: false
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

    $('.video-filter-current').click(function(e) {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.video-filter').length == 0) {
            $('.video-filter').removeClass('open');
        }
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

    $('.speaker-card-descr-more a').click(function(e) {
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
            if (curGalleryItem.find('a').attr('title') !== undefined) {
                curTitle = ' title="' + curGalleryItem.find('a').attr('title') + '"';
            }
            windowHTML +=                   '<div class="window-photo-preview-list-item"><a href="#"' + curTitle + '><img src="' + curGalleryItem.find('img').attr('src') + '" alt="" /></a></div>';
        }
        windowHTML +=                   '</div>' +
                                    '</div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.779074 14.4895C0.592823 14.3022 0.488281 14.0487 0.488281 13.7845C0.488281 13.5204 0.592823 13.2669 0.779074 13.0795L13.5091 0.349543C13.5987 0.244862 13.709 0.159841 13.8331 0.0998181C13.9572 0.0397948 14.0923 0.00606467 14.23 0.000745179C14.3677 -0.00457431 14.5051 0.0186316 14.6334 0.0689062C14.7617 0.119181 14.8783 0.195439 14.9757 0.292893C15.0732 0.390348 15.1494 0.506896 15.1997 0.635221C15.25 0.763546 15.2732 0.900878 15.2679 1.0386C15.2626 1.17632 15.2288 1.31145 15.1688 1.43551C15.1088 1.55958 15.0238 1.6699 14.9191 1.75954L2.18907 14.4895C2.00171 14.6758 1.74826 14.7803 1.48407 14.7803C1.21989 14.7803 0.966436 14.6758 0.779074 14.4895Z" /><path d="M0.779074 0.349508C0.966436 0.163257 1.21989 0.0587158 1.48407 0.0587158C1.74826 0.0587158 2.00171 0.163257 2.18907 0.349508L14.9191 13.0795C15.0238 13.1692 15.1088 13.2795 15.1688 13.4035C15.2288 13.5276 15.2626 13.6627 15.2679 13.8005C15.2732 13.9382 15.25 14.0755 15.1997 14.2038C15.1494 14.3322 15.0732 14.4487 14.9757 14.5462C14.8783 14.6436 14.7617 14.7199 14.6334 14.7701C14.5051 14.8204 14.3677 14.8436 14.23 14.8383C14.0923 14.833 13.9572 14.7993 13.8331 14.7392C13.709 14.6792 13.5987 14.5942 13.5091 14.4895L0.779074 1.75951C0.592823 1.57215 0.488281 1.31869 0.488281 1.05451C0.488281 0.790323 0.592823 0.536871 0.779074 0.349508Z" /></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-download download" target="_blank"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0291 10.2594L9.98914 13.2993L6.94922 10.2594" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/><path d="M9.98828 0.760254V12.7938" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/><path d="M6.94823 6.45972H3.52832V18.6194H16.448V6.45972H13.0281" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/></svg></a>';
        windowHTML +=           '<div class="window-photo-social">';
        windowHTML +=               '<div class="window-photo-social-icon"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.58203 11.4219C4.58788 11.4219 5.47434 10.9592 6.03976 10.2548L12.4347 13.2746C12.3562 13.5316 12.3008 13.7976 12.3008 14.0781C12.3008 15.6892 13.6887 17 15.3945 17C17.1003 17 18.4883 15.6892 18.4883 14.0781C18.4883 12.4671 17.1003 11.1562 15.3945 11.1562C14.3885 11.1562 13.502 11.6191 12.9366 12.3236L6.54175 9.30379C6.6203 9.04673 6.67578 8.78063 6.67578 8.5C6.67578 8.2195 6.62035 7.95349 6.54184 7.69651L12.9368 4.67667C13.5022 5.38102 14.3887 5.84375 15.3945 5.84375C17.1003 5.84375 18.4883 4.53292 18.4883 2.92187C18.4883 1.31083 17.1003 -1.78601e-06 15.3945 -1.63688e-06C13.6887 -1.48776e-06 12.3008 1.31083 12.3008 2.92187C12.3008 3.2025 12.3563 3.4686 12.4348 3.72567L6.03999 6.74547C5.47461 6.04098 4.58801 5.57812 3.58203 5.57812C1.87622 5.57812 0.488282 6.88896 0.488282 8.5C0.488283 10.111 1.87622 11.4219 3.58203 11.4219ZM15.3945 12.2187C16.48 12.2187 17.3633 13.053 17.3633 14.0781C17.3633 15.1033 16.48 15.9375 15.3945 15.9375C14.3091 15.9375 13.4258 15.1033 13.4258 14.0781C13.4258 13.053 14.3091 12.2187 15.3945 12.2187ZM15.3945 1.0625C16.48 1.0625 17.3633 1.89673 17.3633 2.92187C17.3633 3.94702 16.48 4.78125 15.3945 4.78125C14.3091 4.78125 13.4258 3.94702 13.4258 2.92187C13.4258 1.89673 14.3091 1.0625 15.3945 1.0625ZM3.58203 6.64062C4.66748 6.64062 5.55078 7.47485 5.55078 8.5C5.55078 9.52515 4.66748 10.3594 3.58203 10.3594C2.49658 10.3594 1.61328 9.52515 1.61328 8.5C1.61328 7.47485 2.49658 6.64062 3.58203 6.64062Z" /></svg></div>';
        windowHTML +=               '<div class="window-photo-social-window">';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-fb"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 15.0914C30 6.75575 23.2852 0 15 0C6.71484 0 0 6.75575 0 15.0914C0 22.6253 5.48438 28.8681 12.6562 30V19.4537H8.84766V15.0914H12.6562V11.7666C12.6562 7.98487 14.8945 5.89507 18.3223 5.89507C19.9629 5.89507 21.6797 6.18982 21.6797 6.18982V9.90371H19.7871C17.9238 9.90371 17.3438 11.068 17.3438 12.2617V15.0914H21.5039L20.8389 19.4537H17.3438V30C24.5156 28.8681 30 22.6253 30 15.0914Z" /></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-vk"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM14.5822 12.7112L14.5508 12.1921C14.4563 10.8469 15.2852 9.61814 16.5967 9.14148C17.0794 8.972 17.8978 8.95081 18.4329 9.09911C18.6427 9.16266 19.0414 9.37451 19.3247 9.56518L19.8388 9.91473L20.4054 9.73466C20.7202 9.63933 21.1398 9.48044 21.3287 9.37451C21.5071 9.27918 21.6645 9.22622 21.6645 9.258C21.6645 9.43807 21.2762 10.0524 20.951 10.3914C20.5103 10.8681 20.6362 10.9104 21.5281 10.5927C22.0632 10.4126 22.0737 10.4126 21.9687 10.6138C21.9058 10.7198 21.5805 11.0905 21.2343 11.4295C20.6467 12.0121 20.6152 12.0756 20.6152 12.5629C20.6152 13.3149 20.2585 14.8826 19.9018 15.7406C19.2408 17.3507 17.8243 19.0137 16.4079 19.8505C14.4144 21.0263 11.7598 21.3229 9.52499 20.6344C8.78005 20.4013 7.5 19.8082 7.5 19.7022C7.5 19.6705 7.88821 19.6281 8.36036 19.6175C9.34663 19.5963 10.3329 19.3209 11.1723 18.8336L11.7388 18.4947L11.0883 18.2722C10.165 17.9545 9.33613 17.2236 9.12629 16.5351C9.06334 16.3126 9.08432 16.302 9.67188 16.302L10.2804 16.2914L9.76631 16.0478C9.15777 15.7406 8.60168 15.2216 8.32888 14.692C8.12953 14.3106 7.87772 13.3467 7.95116 13.2726C7.97215 13.2408 8.19248 13.3043 8.4443 13.3891C9.16826 13.6539 9.26269 13.5903 8.843 13.1455C8.05609 12.3404 7.81477 11.1435 8.19248 10.0101L8.37085 9.50163L9.06334 10.1901C10.4798 11.5778 12.148 12.404 14.0576 12.6476L14.5822 12.7112Z" /></svg></a>';
        windowHTML +=               '</div>';
        windowHTML +=           '</div>';
        windowHTML +=           '<div class="window-photo-title"></div>';

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
            var newHeight = $('.window-photo-title').height() + marginPhoto;
            $('.window-photo-slider-list-item-inner').css({'height': 'calc(100vh - ' + newHeight + 'px)', 'line-height': 'calc(100vh - ' + newHeight + 'px)'});
        });

        if ($(window).width() > 1169) {
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
            prevArrow: '<button type="button" class="slick-prev"><svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.999265L2 6.99927L9 12.9993" stroke="#ffffff" stroke-width="2"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13.0012L8 7.00122L0.999999 1.00122" stroke="#ffffff" stroke-width="2"/></svg></button>',
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
            if ($('.window-photo-preview-list-item').eq(currentSlide).find('a').attr('title') !== undefined) {
                $('.window-photo-title').html($('.window-photo-preview-list-item').eq(currentSlide).find('a').attr('title'));
            } else {
                $('.window-photo-title').html('');
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
});