$(document).ready(function() {

    $('.page-link').click(function(e) {
        var curBlock = $(this.hash);
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight() - 50});
            e.preventDefault();
        }
    });

    $('.header-search-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
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

    $('.welcome-slider').each(function() {
        var curTime = 5000;
        if (typeof($('.welcome-slider-item').eq(0).attr('data-time')) != 'undefined') {
            curTime = Number($('.welcome-slider-item').eq(0).attr('data-time'));
        }

        $('.welcome-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: curTime,
            pauseOnFocus: false,
            pauseOnHover: false,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#welcome-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#welcome-next"></use></svg></button>',
            dots: true
        }).on('setPosition', function(event, slick) {
            if ($('.welcome-slider .slick-slide.slick-current .welcome-slider-city').length == 1) {
                $('.welcome-slider').addClass('welcome-slider-dots-blue');
            } else {
                $('.welcome-slider').removeClass('welcome-slider-dots-blue');
            }
            var newTime = 5000;
            if (typeof($('.welcome-slider .slick-current .welcome-slider-item').attr('data-time')) != 'undefined') {
                newTime = Number($('.welcome-slider .slick-current .welcome-slider-item').attr('data-time'));
            }
            $('.welcome-slider').slick('slickSetOption', 'autoplaySpeed', newTime);
        });
    });

    $('.main-block .speakers').each(function() {
        var curBlock = $(this).parent();
        var curSize = 8;
        if ($(window).width() < 768) {
            curSize = 6;
        }
        if ($(window).width() > 1799) {
            curSize = 12;
        }
        if (curBlock.find('.speaker').length > curSize) {
            curBlock.find('.speakers-more').addClass('visible');
        } else {
            curBlock.find('.speakers-more-all').addClass('visible');
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
        if ($(window).width() > 1799) {
            curSize = 12;
        }
        countVisible += curSize;
        if (countVisible >= countItems) {
            curBlock.find('.speakers-more').removeClass('visible');
            curBlock.find('.speakers-more-all').addClass('visible');
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
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
                curGallery.next().mCustomScrollbar('scrollTo', curGallery.next().find('.gallery-preview-item').eq(nextSlide));
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


    $('.exponent-project-photos .photo-gallery').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.photo-gallery-item').length > 5) {
            curBlock.append('<div class="photo-gallery-item photo-gallery-item-count"><div class="photo-gallery-item-inner"><div class="photo-gallery-item-count-text"><span>+' + (curBlock.find('.photo-gallery-item').length - 5) + '</span> фото</div></div>');
        }
    });

    $('.photo-gallery-item-count-text').click(function(e) {
        $(this).parents().filter('.photo-gallery').find('.photo-gallery-item').eq(5).find('a').trigger('click');
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

    $('body').on('click', '.speakers-letters a', function(e) {
        var curLink = $(this);
        if (curLink.hasClass('active')) {
            curLink.removeClass('active');
        } else {
            $('.speakers-letters a.active').removeClass('active');
            curLink.addClass('active');
        }
        filterSpeakers();
        e.preventDefault();
    });

    $('body').on('change', '.speakers-filter-item input', function(e) {
        filterSpeakers();
        e.preventDefault();
    });

    $('body').on('click', '.speakers-filter-group-header', function(e) {
        $(this).parent().toggleClass('open');
        $(this).parent().addClass('open-mobile');
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
        if ($('html').hasClass('speakers-filter-open')) {
            $('html').removeClass('speakers-filter-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $('.speakers-filter-group-reset').click(function(e) {
        var curGroup = $(this).parents().filter('.speakers-filter-group');
        curGroup.find('.speakers-filter-item input').prop('checked', false);
        filterSpeakers();
        e.preventDefault();
    });

    $('.speakers-filter-group-close').click(function(e) {
        var curGroup = $(this).parents().filter('.speakers-filter-group');
        curGroup.removeClass('open-mobile');
        e.preventDefault();
    });

    $('.speakers-filter-group-apply a').click(function(e) {
        var curGroup = $(this).parents().filter('.speakers-filter-group');
        curGroup.removeClass('open-mobile');
        e.preventDefault();
    });

    $('body').on('click', '.speaker-card-descr-more a', function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    function popupCenter(url, title) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
        var top = ((height / 3) - (360 / 3)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }

    $('body').on('click', '.window-photo-social-item-fb', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-vk', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-link', function(e) {
        e.preventDefault();
    });

    var clipboardPhoto = new ClipboardJS('.window-photo-social-item-link')
    clipboardPhoto.on('success', function(e) {
        alert('OK');
    });

    $('body').on('click', '.photo-gallery-item-inner a', function(e) {
        var curLink = $(this);
        var curItem = curLink.parents().filter('.photo-gallery-item');
        var curGallery = curItem.parents().filter('.photo-gallery');
        var curIndex = curGallery.find('.photo-gallery-item').index(curItem);

        var curPadding = $('.wrapper').width();
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
        windowHTML +=           '<a href="#" class="window-photo-download" target="_blank" download><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-download"></use></svg></a>';
        windowHTML +=           '<div class="window-photo-social">';
        windowHTML +=               '<div class="window-photo-social-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share"></use></svg></div>';
        windowHTML +=               '<div class="window-photo-social-window">';
        windowHTML +=                   '<a href="#" data-clipboard-target="#ownd-url" class="window-photo-social-item window-photo-social-item-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-link"></use></svg></a>';
        //windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-fb"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-fb"></use></svg></a>';
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

		if ( $( '#ownd-url-base' ).length ) {
            var picId = curLink.data( 'id' );
            var picUrl = curLink.data( 'url' );
            var url = $( '#ownd-url-base' ).val() +  picId + '/';
            if ( picUrl != 'undefined' )
            {
                url = picUrl;
            }
            history.pushState( '', '', url );
            $( '.window-photo-social-item-vk' ).attr( 'href', 'https://vk.com/share.php?url=http://' + document.domain + url );
            $( '.window-photo-social-item-fb' ).attr( 'href', 'https://www.facebook.com/sharer/sharer.php?u=http://' + document.domain + url );
            $( '#ownd-url' ).text( 'http://' + document.domain + url );
        }

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);

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

            if ( $( '#ownd-url-base' ).length ) {
                var picId = $('.window-photo-preview-list-item').eq(currentSlide).find( 'a' ).data( 'id' );
                var picUrl = $('.window-photo-preview-list-item').eq(currentSlide).find( 'a' ).data( 'url' );
                var url = $( '#ownd-url-base' ).val() +  picId + '/';
                if ( picUrl && picUrl != 'undefined' )
                {
                    url = picUrl;
                }
                history.pushState( '', '', url );
                $( '.window-photo-social-item-vk' ).attr( 'href', 'https://vk.com/share.php?url=http://' + document.domain + url );
                $( '.window-photo-social-item-fb' ).attr( 'href', 'https://www.facebook.com/sharer/sharer.php?u=http://' + document.domain + url );
                $( '#ownd-url' ).text( 'http://' + document.domain + url );
            }

            $('.window-photo-preview-inner').mCustomScrollbar('scrollTo', $('.window-photo-preview-list-item').eq(currentSlide));
            $('.window-photo-download').attr('href', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
            $('.window-photo-social-item-link').attr('data-clipboard-text', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
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
        e.preventDefault();

		if ( $( '#ownd-url-base' ).length )
		{
			history.pushState( '', '', $( '#ownd-url-base' ).val() );
		}
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-photo').length > 0) {
                $('.window-photo-close').trigger('click');
            }
        }
    });

    $('body').on('click', '.window-video-social-item-fb', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-video-social-item-vk', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-video-social-item-link', function(e) {
        e.preventDefault();
    });

    var clipboardVideo = new ClipboardJS('.window-video-social-item-link')
    clipboardVideo.on('success', function(e) {
        alert('OK');
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
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-video-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        var windowHTML =    '<div class="window-video">';

        windowHTML +=           '<a href="#" class="window-video-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';
        windowHTML +=           '<div class="window-video-social">';
        windowHTML +=               '<div class="window-video-social-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share"></use></svg></div>';
        windowHTML +=               '<div class="window-video-social-window">';
        windowHTML +=                   '<a href="#" data-clipboard-target="#ownd-url" class="window-video-social-item window-video-social-item-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-link"></use></svg></a>';
        //windowHTML +=                   '<a href="#" class="window-video-social-item window-video-social-item-fb"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-fb"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-video-social-item window-video-social-item-vk"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-vk"></use></svg></a>';
        windowHTML +=               '</div>';
        windowHTML +=           '</div>';

        windowHTML +=           '<div class="window-video-slider">' +
                                    '<div class="window-video-slider-list">';

        var galleryLength = curGallery.find('.video-gallery-item').length;
        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.video-gallery-item').eq(i);
            windowHTML +=               '<div class="window-video-slider-list-item" data-id="' + curGalleryItem.find('a').data( 'id' ) + '">' +
                                            '<div class="window-video-slider-list-item-inner" data-videourl="' + curGalleryItem.find('a').attr('href') + '"></div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                '</div>';

        windowHTML +=       '</div>';

        $('.window-video').remove();
        $('body').append(windowHTML);

		if ( $( '#ownd-url-base' ).length ) {
            var videoId = curLink.data( 'id' );
            var url = $( '#ownd-url-base' ).val() +  videoId + '/';
            history.pushState( '', '', url );
            $( '.window-video-social-item-vk' ).attr( 'href', 'http://vk.com/share.php?url=http://' + document.domain + url );
            $( '.window-video-social-item-fb' ).attr( 'href', 'http://www.facebook.com/sharer/sharer.php?u=http://' + document.domain + url );
            $( '#ownd-url' ).text( 'http://' + document.domain + url );
        }

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);

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

            if ( $( '#ownd-url-base' ).length ) {
                var videoId = $('.slick-current .window-video-slider-list-item').data( 'id' );
                var url = $( '#ownd-url-base' ).val() +  videoId + '/';
                history.pushState( '', '', url );
                $( '.window-video-social-item-vk' ).attr( 'href', 'http://vk.com/share.php?url=http://' + document.domain + url );
                $( '.window-video-social-item-fb' ).attr( 'href', 'http://www.facebook.com/sharer/sharer.php?u=http://' + document.domain + url );
                $( '#ownd-url' ).text( 'http://' + document.domain + url );
            }

            $('.window-video-slider-list-item-inner').html('');
            $('.window-video-social-item-link').attr('data-clipboard-text', $('.window-video-slider-list-item').eq(currentSlide).find('.window-video-slider-list-item-inner').attr('data-videourl'));
            $('.window-video-slider-list-item').eq(currentSlide).find('.window-video-slider-list-item-inner').each(function() {
                $(this).html('<iframe width="560" height="315" src="' + $(this).attr('data-videourl') + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
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
        e.preventDefault();

		if ( $( '#ownd-url-base' ).length )
		{
			history.pushState( '', '', $( '#ownd-url-base' ).val() );
		}
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

    $('body').on('click', '.window-title-social-item-fb', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-title-social-item-vk', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-title-social-item-link', function(e) {
        e.preventDefault();
    });

    var clipboardWindow = new ClipboardJS('.window-title-social-item-link')
    clipboardWindow.on('success', function(e) {
        alert('OK');
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

	if ( $( '#ownd-open-news' ).length )
	{
		$( '#ownd-open-news' ).click();
		$( '#ownd-open-news' ).remove();
	}

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        initForm($(this));
    });

	$('body').on('focus', '.form-input input, .form-input textarea', function() {
		$(this).parent().addClass('focus');
	});

	$('body').on('blur', '.form-input input, .form-input textarea', function() {
		$(this).parent().removeClass('focus');
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

	$('body').on('keyup', '.form-input input, .form-input textarea', function() {
		$(this).parent().removeClass('focus');
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

	$('body').on('click', '.form-input-clear', function(e) {
        $(this).parent().find('input').val('').trigger('change').trigger('blur');
        e.preventDefault();
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
        if (!$('html').hasClass('programm-filter-open')) {
            if ($(window).width() < 1200) {
                var curScroll = $(window).scrollTop();
            }
            $('html').addClass('programm-filter-open');
            if ($(window).width() < 1200) {
                $('html').data('scrollTop', curScroll);
                $('.wrapper').css('margin-top', -curScroll);
            }
        } else {
            $('html').removeClass('programm-filter-open');
            if ($(window).width() < 1200) {
                $('.wrapper').css('margin-top', 0);
                $(window).scrollTop($('html').data('scrollTop'));
            }
        }
        e.preventDefault();
    });

    $('.programm-filter-window-close').click(function(e) {
        $('html').removeClass('programm-filter-open');
        if ($(window).width() < 1200) {
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.programm-filter-window').length == 0 && $(e.target).parents().filter('.programm-filter-btn').length == 0) {
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

    $('.programm-filter-window-checkboxes-current').click(function() {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.programm-filter-window-checkboxes-wraper-with-search').length == 0) {
            $('.programm-filter-window-checkboxes-wraper-with-search').removeClass('open');
        }
    });

    $('.programm-filter-window-checkboxes-wraper-with-search .form-checkbox input').change(function() {
        var curInput = $(this);
        var curBlock = $(this).parents().filter('.programm-filter-window-block-with-search');
        curBlock.find('.programm-filter-window-checkboxes-wraper-with-search').removeClass('open');
    });

    $('.programm-filter-window-checkboxes-search input').on('keydown', function(e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    $('.programm-filter-window-checkboxes-search input').on('keyup', function(e) {
        var curValue = $(this).val().toLowerCase();
        var curBlock = $(this).parents().filter('.programm-filter-window-block-with-search');
        curBlock.find('.programm-filter-window-checkboxes-wraper-with-search .form-checkbox').each(function() {
            var curItem = $(this);
            if (curItem.find('span').text().toLowerCase().indexOf(curValue) == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
    });

    $('.programm-filter-window-checkboxes .form-checkbox input').change(function() {
        updateProgrammFilter();
    });

    $('.programm-filter-window-checkboxes .form-checkbox label').on('mouseenter', function() {
        var curSpan = $(this).find('span');
        if (curSpan.parents().filter('.programm-filter-window-checkboxes-wraper-with-search').length == 0) {
            $('body').append('<div class="programm-filter-window-checkbox-hint" style="left:' + curSpan.offset().left + 'px; top:' + curSpan.offset().top + 'px">' + curSpan.html() + '</div>');
        }
    });

    $('.programm-filter-window-checkboxes .form-checkbox label').on('mouseleave', function() {
        $('.programm-filter-window-checkbox-hint').remove();
    });

    $('.programm-filter').each(function() {
        updateProgrammFilter();
    });

    $('body').on('click', '.programm-filter-param a', function(e) {
        var curLink = $(this);
        var curType = curLink.attr('data-type');
        if (curType == 'checkbox') {
            $('.programm-filter-window-checkboxes .form-checkbox input[name="' + curLink.attr('data-name') + '"]').prop('checked', false);
        }
        updateProgrammFilter();
        e.preventDefault();
    });

    $('.programm-filter-window-reset a').click(function(e) {
        $('.programm-filter-window-checkboxes .form-checkbox input').prop('checked', false);
        updateProgrammFilter();
        $('.programm-filter-window-close').trigger('click');
        e.preventDefault();
    });

    $('.programm-filter-window-apply a').click(function(e) {
        $('.programm-filter-window-close').trigger('click');
        e.preventDefault();
    });

    $('.programm-filter-window-label').click(function(e) {
        $(this).parent().addClass('open');
    });

    $('.programm-filter-window-block-close').click(function(e) {
        $(this).parent().removeClass('open');
        e.preventDefault();
    });

    $('.programm-filter-window-block-apply').click(function(e) {
        $(this).parent().removeClass('open');
        e.preventDefault();
    });

    $('.programm-filter-window-block-reset a').click(function(e) {
        var curBlock = $(this).parent().parent();
        curBlock.find('.programm-filter-window-checkboxes .form-checkbox input').prop('checked', false);
        updateProgrammFilter();
        e.preventDefault();
    });

    $('.programm-filter-window-block-params-remove').click(function(e) {
        $(this).parents().filter('.programm-filter-window-block').find('.programm-filter-window-block-reset a').trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.programm-filter-window-block-params-item a', function(e) {
        var curItem = $(this).parent();
        var curID = curItem.attr('data-id');
        var curBlock = curItem.parents().filter('.programm-filter-window-block');
        curBlock.find('.programm-filter-window-checkboxes .form-checkbox input').eq(curID).prop('checked', false);
        updateProgrammFilter();
        e.preventDefault();
    });

    $('.programm-dates a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.programm-dates li.active').removeClass('active');
            curLi.addClass('active');
            $('.programm-dates-current span').html($(this).html());
            redrawProgramm();
            updateProgrammFilter();
        }
        $('.programm-dates').removeClass('open');
        e.preventDefault();
    });

    if ($('.programm-dates').length == 1) {
        if (window.location.hash != '') {
            var curID = window.location.hash.replace('#', '');
            $('.programm-dates li a[data-id="' + curID + '"]').trigger('click');
        }
    }

    $('.programm-dates-current').click(function() {
        $('.programm-dates').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.programm-dates').length == 0) {
            $('.programm-dates').removeClass('open');
        }
    });

    $('body').on('click', '.programm-halls-mobile a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.programm-halls-mobile li.active').removeClass('active');
            curLi.addClass('active');
            $('.programm-halls-mobile-current span').html($(this).html());
            var curIndex = $('.programm-halls-mobile li').index(curLi);
            $('.programm-list-hall.active').removeClass('active');
            $('.programm-list-hall').eq(curIndex).addClass('active');
        }
        $('.programm-halls-mobile').removeClass('open');
        e.preventDefault();
    });

    $('.programm-halls-mobile-current').click(function() {
        $('.programm-halls-mobile').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.programm-halls-mobile').length == 0) {
            $('.programm-halls-mobile').removeClass('open');
        }
    });

    $('.mobile-menu-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.nav ul li').each(function(e) {
        var curLi = $(this);
        if (curLi.find('ul').length != 0) {
            curLi.find('ul').prepend('<li class="nav-mobile-parent"><a href="' + curLi.find('> a').attr('href') + '">' + curLi.find('> a span').html() + '</a></li>');
        }
    });

    $('.nav ul li a').click(function(e) {
        if ($(window).width() < 1200) {
            if ($(this).parent().find('ul').length != 0) {
                $(this).parent().toggleClass('open');
                $('html').toggleClass('mobile-submenu-open');
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

    $('.speakers-filter-btn').click(function(e) {
        if (!$('html').hasClass('speakers-filter-open')) {
            var curScroll = $(window).scrollTop();
            $('html').addClass('speakers-filter-open');
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.speakers-filter-close').click(function(e) {
        if ($('html').hasClass('speakers-filter-open')) {
            $('html').removeClass('speakers-filter-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $('.speakers-filter-apply').click(function(e) {
        if ($('html').hasClass('speakers-filter-open')) {
            $('html').removeClass('speakers-filter-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $('.archive-card-video .video-gallery').each(function() {
        var curBlock = $(this).parent();
        var curSize = 12;
        if (curBlock.find('.video-gallery-item').length > curSize) {
            curBlock.find('.video-gallery-more').addClass('visible');
        }
    });

    $('.video-gallery-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.archive-card-video');
        var countItems = curBlock.find('.video-gallery-item').length;
        var countVisible = curBlock.find('.video-gallery-item:visible').length;
        var curSize = 12;
        countVisible += curSize;
        if (countVisible >= countItems) {
            curBlock.find('.video-gallery-more').removeClass('visible');
        }
        curBlock.find('.video-gallery-item:lt(' + countVisible + ')').addClass('visible');
        e.preventDefault();
    });

    $('.main-conf-speakers .speakers').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1799,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    dots: false
                }
            },
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
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.analytics-programm-tab-title').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.main-stream-video-player-preview', function(e) {
        var curPlayer = $(this).parents().filter('.main-stream-video-player');
        $('.main-stream-video-player-content').html('');
        $('.main-stream-video-player.start').removeClass('start');
        curPlayer.find('.main-stream-video-player-content').html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        curPlayer.addClass('start');
        e.preventDefault();
    });

    $('body').on('click', '.vacancy a, .window-vacancy-link-other', function() {
        if (typeof($(this).attr('data-id')) != 'undefined') {
            window.location.hash = $(this).attr('data-id');
        }
    });

    $('.vacancy').each(function() {
        if (window.location.hash != '') {
            var curID = window.location.hash.replace('#', '');
            $('.vacancy a[data-id="' + curID + '"]').trigger('click');
        }
    });

    $('body').on('click', '.main-manifest-more a', function(e) {
        $('.main-manifest-more').toggleClass('open');
        $('.main-manifest-detail').slideToggle();
        e.preventDefault();
    });

    $('body').on('click', '.health-faq-item-title', function(e) {
        var curItem = $(this).parent();
        curItem.toggleClass('open');
        curItem.find('.health-faq-item-text').slideToggle();
        e.preventDefault();
    });

    $('body').on('click', '.exponent-text-more a', function(e) {
        var curBlock = $(this).parents().filter('.exponent-text');
        curBlock.toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.academy-welcome-social-item-fb', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.academy-welcome-social-item-telegram', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://telegram.me/share/url?url=' + curUrl + '&text=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('.academy-lectures').each(function() {
        var curBlock = $(this);
        var curSize = 4;
        if (curBlock.find('.archive-card-video-big').length > curSize) {
            $('.academy-lectures-more').addClass('visible');
        }
    });

    $('.academy-lectures-more a').click(function(e) {
        var curBlock = $(this).parent().parent().find('.academy-lectures');
        $('.academy-lectures-more').removeClass('visible');
        curBlock.find('.archive-card-video-big').addClass('visible');
        e.preventDefault();
    });

    $('.academy-add .video-gallery').each(function() {
        var curBlock = $(this);
        var curSize = 4;
        if (curBlock.find('.video-gallery-item').length > curSize) {
            $('.academy-add-video-gallery-more').addClass('visible');
        }
    });

    $('.academy-add-video-gallery-more a').click(function(e) {
        var curBlock = $('.academy-add .video-gallery');
        $('.academy-add-video-gallery-more').removeClass('visible');
        curBlock.find('.video-gallery-item').addClass('visible');
        e.preventDefault();
    });

    $('body').on('click', '.faq-item-title', function(e) {
        var curItem = $(this).parent();
        curItem.toggleClass('open');
        curItem.find('.faq-item-text').slideToggle();
        e.preventDefault();
    });

    $('.archive-card-video-big-lectors-item').on('mouseenter', function() {
        var curWindow = $(this).find('.archive-card-video-big-lectors-item-window');
        if (curWindow.offset().left + curWindow.outerWidth() > $('.wrapper').width()) {
            curWindow.addClass('to-right');
        }
    });

    $('.archive-card-video-big-lectors-item').on('mouseleave', function() {
        $('.archive-card-video-big-lectors-item-window').removeClass('to-right');
    });

    $('.academy-about-text-more a').click(function(e) {
        $('.academy-about-text').toggleClass('open');
        e.preventDefault();
    });

    $('.academy-authors-text-more a').click(function(e) {
        $('.academy-authors-text').toggleClass('open');
        e.preventDefault();
    });

    $('.academy-step-text h4').click(function() {
        $(this).parent().parent().toggleClass('open');
    });

    $('.archive-card-video-big-more-link a').click(function(e) {
        $(this).parents().filter('.archive-card-video-big').toggleClass('open');
        e.preventDefault();
    });

    $('.analytics-service-title').click(function() {
        $(this).parents().filter('.analytics-service').toggleClass('open');
    });

    $('.analytics-service-close a').click(function(e) {
        $(this).parents().filter('.analytics-service').removeClass('open');
        e.preventDefault();
    });

    $('.analytics-programm-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.analytics-library');
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            curBlock.find('.analytics-programm-list').append($(html).find('.analytics-programm-list').html());
            curBlock.find('.analytics-programm-item').each(function() {
                var curItem = $(this);
                if (curItem.find('.analytics-programm-item-preview img').length > 0) {
                    curItem.addClass('analytics-programm-item-with-preview');
                }
            });
            if ($(html).find('.analytics-programm-more').length == 1) {
                curBlock.find('.analytics-programm-more a').attr('href', $(html).find('.analytics-programm-more a').attr('href'));
            } else {
                curBlock.find('.analytics-programm-more').remove();
            }
        });
        e.preventDefault();
    });

    $('.analytics-programm-tab-close a').click(function(e) {
        $(this).parents().filter('.analytics-programm-tab').removeClass('open');
        e.preventDefault();
    });

    $('.analytics-programm-item').each(function() {
        var curItem = $(this);
        if (curItem.find('.analytics-programm-item-preview img').length > 0) {
            curItem.addClass('analytics-programm-item-with-preview');
        }
    });

    $('.cityform-factor-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.cityform-recommend-item-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.cityform-what-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.cityform-what-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.cityform-what-menu ul li').index(curLi);
            $('.cityform-what-content.active').removeClass('active');
            $('.cityform-what-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.cityform-menu-list').each(function() {
        var curLink = $('.cityform-menu-list ul li a').eq(0);
        curLink.parent().addClass('active');
        $('.cityform-menu-current').html(curLink.html());
    });

    $('body').on('click', '.cityform-menu-link, .cityform-menu-current', function(e) {
        $('html').toggleClass('cityform-menu-open');
        e.preventDefault();
    });

    $('body').on('click', '.cityform-menu-list ul li a', function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').height() - 20});
        }
        $('html').removeClass('cityform-menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.cityform-menu').length == 0) {
            $('html').removeClass('cityform-menu-open');
        }
    });

    $('.cityform-about-world-continent-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.cityform-recommend-item-city-header').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.cityform-recommend-item-city-content span').on('mouseenter', function() {
        var curBlock = $(this).find('em');
        if (curBlock.offset().left + curBlock.width() > $('.wrapper').width()) {
            curBlock.addClass('to-right');
        }
    });

    $('.cityform-recommend-item-city-content span').on('mouseleave', function() {
        var curBlock = $(this).find('em');
        curBlock.removeClass('to-right');
    });

    $('.cityform-health-scheme-item-title').click(function() {
        $('.cityform-health-scheme-item-window').remove();
        $('body').append('<div class="cityform-health-scheme-item-window">' + $(this).parent().html() + '</div>');
    });

    $('.cityform-health-scheme-item-mobile').click(function() {
        var curItem = $(this);
        var curIndex = $('.cityform-health-scheme-item-mobile').index(curItem);
        $('.cityform-health-scheme-item-window').remove();
        $('body').append('<div class="cityform-health-scheme-item-window">' + $('.cityform-health-scheme-item').eq(curIndex).html() + '</div>');
    });

    $('body').on('click', '.cityform-health-scheme-item-btn a, .cityform-health-scheme-item-close', function(e) {
        $('.cityform-health-scheme-item-window').remove();
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.cityform-health-scheme-item-mobile').length == 0 && $(e.target).parents().filter('.cityform-health-scheme-item').length == 0 && $(e.target).parents().filter('.cityform-health-scheme-item-window').length == 0) {
            $('.cityform-health-scheme-item-window').remove();
        }
    });

    $('.cityform-what-content-title a').click(function(e) {
        $(this).parent().parent().toggleClass('open');
        e.preventDefault();
    });

});

function redrawProgramm() {
    $('.programm-container').each(function() {
        var curData = null;
        var curDate = $('.programm-dates li.active a').attr('data-date');

        $('.programm-list').mCustomScrollbar('destroy');

        for (var i = 0; i < programmData.length; i++) {
            if (programmData[i].date == curDate) {
                curData = programmData[i].data;
                $('.programm-current-day-text').html(programmData[i].datetext);
            }
        }

        $('.programm-halls-inner').html('');
        var curMobileHallSelected = '';
        if ($('.programm-halls-mobile ul li.active').length == 1) {
            curMobileHallSelected = $('.programm-halls-mobile ul li.active a').html();
        }
        $('.programm-halls-mobile ul').html('');
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
                var curMobileHall = $('<div>' + curData[i].hall + '</div>').find('span').html();
                if (typeof(curData[i].digital) != 'undefined' && curData[i].digital) {
                    curMobileHall = '<em>Digital</em>' + curMobileHall;
                }
                $('.programm-halls-mobile ul').append('<li><a href="#">' + curMobileHall + '</a></li>');
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
                        if (typeof(curEvent.totalinside) != 'undefined' && curEvent.totalinside) {
                            classTotal = classTotal + ' programm-list-item-total-inside';
                        }
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
                    hallHTML +=         '<div class="programm-list-item ' + classType + ' ' + classTotal + '" style="top:calc(' + eventTop + '% + 7px); height:calc(' + eventHeight + '% - 14px); ' + styleTotal + '" data-start="' + curEvent.start + '" data-speakers="' + curEvent.speakers.join(',') + '" data-sections="' + curEvent.sections.join(',') + '">';
                    hallHTML +=             '<a href="' + curEvent.url + '">';
                    hallHTML +=                 '<div class="programm-list-item-border" style="background:' + curEvent.color + '"></div>';
                    hallHTML +=                 '<div class="programm-list-item-inner">';
                    hallHTML +=                     '<div class="programm-list-item-content">';
                    if (typeof(curEvent.total) != 'undefined' && curEvent.total) {
                        if (typeof(curEvent.text) != 'undefined') {
                            hallHTML +=                 '<div class="programm-list-item-type">' + curEvent.text + '</div>';
                        }
                        hallHTML +=                     '<div class="programm-list-item-title">' + curEvent.title + '</div>';
                        if (typeof(curEvent.text) != 'undefined') {
                            hallHTML +=                 '<div class="programm-list-item-type programm-list-item-type-mobile">' + curEvent.text + '</div>';
                        }
                        hallHTML +=                     '<div class="programm-list-item-time">' + curEvent.start + '&ndash;' + curEvent.end + '</div>';
                    } else {
                        hallHTML +=                     '<div class="programm-list-item-time">' + curEvent.start + '&ndash;' + curEvent.end + '</div>';
                        hallHTML +=                     '<div class="programm-list-item-type">' + curEvent.text + '</div>';
                        hallHTML +=                     '<div class="programm-list-item-title">' + curEvent.title + '</div>';
                    }
                    hallHTML +=                     '</div>';
                    hallHTML +=                 '</div>';
                    hallHTML +=                 '<div class="programm-list-item-shadow"></div>';
                    hallHTML +=             '</a>';
                    hallHTML +=             '<a href="' + curEvent.url + '" class="programm-list-item-full">';
                    hallHTML +=                 '<div class="programm-list-item-border" style="background:' + curEvent.color + '"></div>';
                    hallHTML +=                 '<div class="programm-list-item-inner">';
                    hallHTML +=                     '<div class="programm-list-item-content">';
                    if (typeof(curEvent.total) != 'undefined' && curEvent.total) {
                        if (typeof(curEvent.text) != 'undefined') {
                            hallHTML +=                 '<div class="programm-list-item-type">' + curEvent.text + '</div>';
                        }
                        hallHTML +=                     '<div class="programm-list-item-title">' + curEvent.title + '</div>';
                        if (typeof(curEvent.text) != 'undefined') {
                            hallHTML +=                 '<div class="programm-list-item-type programm-list-item-type-mobile">' + curEvent.text + '</div>';
                        }
                        hallHTML +=                     '<div class="programm-list-item-time">' + curEvent.start + '&ndash;' + curEvent.end + '</div>';
                    } else {
                        hallHTML +=                     '<div class="programm-list-item-time">' + curEvent.start + '&ndash;' + curEvent.end + '</div>';
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
            if (curMobileHallSelected == '') {
                $('.programm-halls-mobile ul li').eq(0).addClass('active');
                $('.programm-halls-mobile-current span').html($('.programm-halls-mobile ul li').eq(0).find('a').html());
                $('.programm-list-hall').eq(0).addClass('active');
            } else {
                $('.programm-halls-mobile ul li a:contains("' + curMobileHallSelected + '")').trigger('click');
            }
        }

    });
}

function updateProgrammFilter() {
    var paramsHTML = '';
    var countParams = 0;

    $('.programm-filter-window-checkboxes .form-checkbox input:checked').each(function() {
        var curInput = $(this);
        var styleColor = '';
        if (curInput.parent().find('span em').length == 1) {
            styleColor = ' style="background:' + curInput.parent().find('span em').css('background-color') + '"';
        }
        paramsHTML += '<div class="programm-filter-param"' + styleColor + '>' + curInput.parent().find('span').html() + '<a href="#" data-type="checkbox" data-name="' + curInput.attr('name') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#programm-filter-param-remove"></use></svg></a></div>';
        countParams++;
    });

    $('.programm-filter-window-block').each(function() {
        var curGroup = $(this);
        var paramsHTMLmobile = '';
        curGroup.find('.programm-filter-window-checkboxes .form-checkbox input:checked').each(function() {
            var curInput = $(this);
            var curIndex = curGroup.find('.form-checkbox').index(curInput.parents().filter('.form-checkbox'));
            paramsHTMLmobile += '<div class="programm-filter-window-block-params-item" data-id="' + curIndex + '">' + curInput.parent().find('span').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#programm-filter-window-block-params-item-remove"></use></svg></a></div>';
        });
        curGroup.find('.programm-filter-window-block-params').html(paramsHTMLmobile);
        if (paramsHTMLmobile != '') {
            curGroup.find('.programm-filter-window-block-params').addClass('visible');
        } else {
            curGroup.find('.programm-filter-window-block-params').removeClass('visible');
        }
    });

    $('.programm-filter-window-checkboxes-wraper-with-search').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.programm-filter-window-checkboxes input:checked').length == 0) {
            curBlock.find('.programm-filter-window-checkboxes-current').html('');
        } else {
            curBlock.find('.programm-filter-window-checkboxes-current').html(curBlock.find('.programm-filter-window-checkboxes input:checked').parent().find('span').html());
        }
    });

    if (countParams > 0) {
        $('.programm-filter-btn span').html(countParams).addClass('visible');
    } else {
        $('.programm-filter-btn span').html('').removeClass('visible');
    }

    $('.programm-filter-params').html(paramsHTML);

    $('.programm-halls-mobile ul li').removeClass('with-count empty');
    $('.programm-halls-mobile ul li a span').remove();
    $('.programm-dates ul li').removeClass('with-count empty');
    $('.programm-dates ul li a span').remove();

    if (paramsHTML == '') {
        $('.programm-list-item.unfilter').removeClass('unfilter');
    } else {
        $('.programm-list-item').addClass('unfilter');

        $('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').each(function() {
            var curVal = $(this).val();
            if (curVal != '0') {
                $('.programm-list-item').each(function() {
                    var curItem = $(this);
                    var curSpeakers = curItem.attr('data-speakers').split(',');
                    if (curSpeakers.indexOf(curVal) != -1) {
                        curItem.removeClass('unfilter');
                    }
                });
            } else {
                $('.programm-list-item').removeClass('unfilter');
            }
        });

        $('.programm-filter-window-checkboxes-sections .form-checkbox input:checked').each(function() {
            var curInput = $(this);
            $('.programm-list-item-type-' + curInput.val()).removeClass('unfilter');
        });

        $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
            var curVal = $(this).val();
            if (curVal != '') {
                $('.programm-list-item').each(function() {
                    var curItem = $(this);
                    var curSections = curItem.attr('data-sections').split(',');
                    if (curSections.indexOf(curVal) != -1) {
                        curItem.removeClass('unfilter');
                    }
                });
            }
        });

        if ($(window).width() > 1199) {
            var curTop = 9999;
            $('.programm-list-item:not(.unfilter, .hidden)').each(function() {
                if ($(this).offset().top < curTop) {
                    curTop = $(this).offset().top;
                }
            });
            if (curTop != 9999) {
                $('html, body').animate({'scrollTop': curTop - $('.programm-ctrl-inner').outerHeight()});
            }
        }

        $('.programm-list-hall').each(function() {
            var curHall = $(this);
            var curIndexHall = $('.programm-list-hall').index(curHall);
            var countEvent = curHall.find('.programm-list-item:not(.unfilter)').length;
            $('.programm-halls-mobile ul li').eq(curIndexHall).each(function() {
                $(this).find('a').append('<span>' + countEvent + '</span>')
                if (countEvent == 0) {
                    $(this).addClass('empty');
                }
            });
        });
        $('.programm-halls-mobile ul li').addClass('with-count');

        $('.programm-dates ul li').each(function() {;
            var curDate = $(this).find('a').attr('data-date');

            var curData = null;

            for (var i = 0; i < programmData.length; i++) {
                if (programmData[i].date == curDate) {
                    curData = programmData[i].data;
                }
            }

            var countEvent = 0;

            if (curData != null) {

                var countHalls = curData.length;

                for (var i = 0; i < countHalls; i++) {
                    for (var j = 0; j < curData[i].events.length; j++) {
                        var curEvent = curData[i].events[j];

                        var activeEventSpeaker = false;
                        $('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').each(function() {
                            var curVal = $(this).val();
                            if (curVal != '0') {
                                if (curEvent.speakers.indexOf(Number(curVal)) != -1) {
                                    activeEventSpeaker = true;
                                }
                            } else {
                                activeEventSpeaker = true;
                            }
                        });
                        if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length == 0) {
                            activeEventSpeaker = true;
                        }

                        var activeEventSections = false;
                        $('.programm-filter-window-checkboxes-sections .form-checkbox input:checked').each(function() {
                            var curVal = $(this).val();
                            if (curEvent.type == curVal) {
                                activeEventSections = true;
                            }
                        });
                        if ($('.programm-filter-window-checkboxes-sections .form-checkbox input:checked').length == 0) {
                            activeEventSections = true;
                        }

                        var activeEventTypes = false;
                        $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
                            var curVal = $(this).val();
                            if (curVal != '') {
                                if (curEvent.sections.indexOf(Number(curVal)) != -1) {
                                    activeEventTypes = true;
                                }
                            } else {
                                activeEventTypes = true;
                            }
                        });
                        if ($('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length == 0) {
                            activeEventTypes = true;
                        }

                        if (activeEventSpeaker && activeEventSections && activeEventTypes) {
                            countEvent++;
                        }
                    }
                }

                $(this).find('a').append('<span>' + countEvent + '</span>')
                if (countEvent == 0) {
                    $(this).addClass('empty');
                }
            }
        });
        $('.programm-dates ul li').addClass('with-count');

        $('body').on('click', '.programm-halls-mobile a', function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.programm-halls-mobile li.active').removeClass('active');
                curLi.addClass('active');
                $('.programm-halls-mobile-current span').html($(this).html());
                var curIndex = $('.programm-halls-mobile li').index(curLi);
                $('.programm-list-hall.active').removeClass('active');
                $('.programm-list-hall').eq(curIndex).addClass('active');
            }
            $('.programm-halls-mobile').removeClass('open');
            e.preventDefault();
        });
    }
}

function filterSpeakers() {
    $('.speakers-container').addClass('loading');
    var curForm = $('.speakers-filter form');
    var curData = curForm.serialize();
    curData += '&page=' + $('.pager a.active').attr('data-value');
    if ($('.speakers-letters a.active').length == 1) {
        curData += '&letter=' + $('.speakers-letters a.active').html();
    }
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
        if ($(window).width() > 1199) {
            $('html, body').animate({'scrollTop': $('.page').offset().top - 50});
        } else {
            $('html, body').animate({'scrollTop': 0});
        }

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

    $('.programm-halls').each(function() {
        if ($(window).width() < 1601 && $(window).width() > 767) {
            $('.programm-list').mCustomScrollbar({
                axis: 'x',
                scrollInertia: 0,
                mouseWheel: {
                    enable: false
                },
                callbacks: {
                    onInit: function() {
                        $('.programm-halls-inner').css({'left': 0});
                    },
                    whileScrolling: function() {
                        $('.programm-halls-inner').css({'left': this.mcs.left});
                    }
                }
            });
        } else {
            $('.programm-list').mCustomScrollbar('destroy');
        }
    });

    $('.welcome-slider').each(function() {
        if ($('.welcome-slider .slick-dots').length == 1) {
            $('.welcome-slider .slick-prev').css({'margin-right': $('.welcome-slider .slick-dots').width() / 2 + 20});
            $('.welcome-slider .slick-next').css({'margin-left': $('.welcome-slider .slick-dots').width() / 2 + 20});
        }
    });

    $('.exponent-text').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('open with-more');
        if (curBlock.find('.exponent-text-container').height() < curBlock.find('.exponent-text-content').height()) {
            curBlock.addClass('with-more');
        }
    });

    $('.photo-gallery-item-count-text').each(function() {
        var prevBlock = $(this).parents().filter('.photo-gallery').find('.photo-gallery-item:not(.photo-gallery-item-count):visible').eq(-1);
        var prevHeight = prevBlock.find('.photo-gallery-item-inner').height();
        $(this).css({'height': prevHeight + 'px', 'line-height': prevHeight + 'px'});
    });

    $('.analytics-services').each(function() {
        var curList = $(this);

        curList.find('.analytics-service-title').css({'min-height': '0px'});

        curList.find('.analytics-service-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.parents().filter('.analytics-service').offset().top;

            curList.find('.analytics-service-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.parents().filter('.analytics-service').offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.analytics-service-text-1').css({'min-height': '0px'});

        curList.find('.analytics-service-text-1').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.parents().filter('.analytics-service').offset().top;

            curList.find('.analytics-service-text-1').each(function() {
                var otherBlock = $(this);
                if (otherBlock.parents().filter('.analytics-service').offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.cityform-recommend-item-cities').each(function() {
        $('.cityform-recommend-item-city.open').removeClass('open');
        $('.cityform-recommend-item-cities').css({'height': 'auto'});
        $('.cityform-recommend-item-cities').css({'height': $('.cityform-recommend-item-cities').height()});
    });
});

var timerScroll = null;

function updateHistory() {
    $('.cityform-menu-list ul li.active a').each(function() {
        var curLink = $(this);
        if (curLink.attr('href')[0] === '#') {
            var curBlock = $(curLink.attr('href'));
            if (curBlock.length == 1) {
                if (typeof (history.pushState) !== undefined) {
                    history.pushState(null, null, $(this).attr('href'));
                }
            }
        }
    });
}

$(window).on('load resize scroll', function() {
    window.clearTimeout(timerScroll);
    timerScroll = window.setTimeout(function() {
        updateHistory();
    }, 500);

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

        if (windowScroll + windowHeight > $('footer').offset().top) {
            var bottomDiff = 60;
            if ($(window).width() > 1199) {
                bottomDiff = 60;
            }
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top + bottomDiff});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }

    if ($('.welcome').length > 0) {
        if (windowScroll >= $('.welcome').height()) {
            $('header').addClass('with-mobile-bg');
        } else {
            $('header').removeClass('with-mobile-bg');
        }
    }

    $('.programm-ctrl-wrapper').each(function() {
        var curDiff = 100;
        if ($(window).width() < 1800) {
            curDiff = 160;
        }
        if (windowScroll >= $('.programm-container').offset().top && windowScroll < $('.programm-container').offset().top + $('.programm-container').height() - curDiff) {
            $('.programm-ctrl-wrapper').addClass('fixed');
        } else {
            $('.programm-ctrl-wrapper').removeClass('fixed');
        }
    });

    $('.programm-list .mCSB_scrollTools').each(function() {
        var curTools = $(this);
        var curBlock = curTools.parent();
        if (windowScroll + windowHeight > curBlock.offset().top) {
            var curBottom = (windowScroll + windowHeight) - (curBlock.offset().top + curBlock.height() - 5);
            if (curBottom < 5) {
                curBottom = 5;
            }
            curTools.css({'position': 'fixed', 'z-index': 2, 'left': curBlock.offset().left, 'bottom': curBottom, 'right': 'auto', 'width': curBlock.width()});
        } else {
            curTools.css({'position': 'absolute', 'left': 0, 'bottom': 0, 'right': '0', 'width': 'auto'});
        }
    });

    $('.programm-filter-params').each(function() {
        if ($('.program-22-ctrl').length == 0) {
            $('.programm-filter-params').css({'width': ($('.programm-ctrl').width() - $('.programm-dates').width() - $('.programm-filter-btn').width() - 70) + 'px'});
        } else {
            $('.programm-filter-params').css({'width': ($('.program-22-ctrl').width() - $('.program-22-ctrl-dates').width() - $('.programm-filter-btn').width() - 30) + 'px'});
        }
    });

    var curMarginTop = Number($('html').css('margin-top').replace('px', ''));
    if (windowScroll > curMarginTop) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }

    $('.programm-ctrl').each(function() {
        if ($(window).width() > 767 && $('.programm-ctrl-wrapper').hasClass('fixed')) {
            var curDiff = 60;
            if ($(window).width() > 1799) {
                curDiff = 22;
            }
            if ($(window).width() < 1200) {
                curDiff = 75;
            }
            if (windowScroll + windowHeight > $('.prefooter').offset().top) {
                $('.programm-ctrl').css({'margin-bottom': (windowScroll + windowHeight) - $('.prefooter').offset().top + curDiff});
            } else {
                $('.programm-ctrl').css({'margin-bottom': 0});
            }
        } else {
            $('.programm-ctrl').css({'margin-bottom': 0});
        }
    });

    $('.cityform-menu').each(function() {
        var curPosition = $('.cityform-menu').offset().top - 10 - $('header').height() + Number($('.main-block').eq(0).css('margin-top').replace('px', '')) * 0.875;
        if ($(window).width() < 1200) {
            curPosition = $('.cityform-menu').offset().top - 10 - $('header').height() + Number($('.main-block').eq(0).css('margin-top').replace('px', ''));
        }
        if (windowScroll > curPosition) {
            $('.cityform-menu').addClass('fixed');
        } else {
            $('.cityform-menu').removeClass('fixed');
        }
    });

    $('.cityform-menu-list ul li a').each(function() {
        var curLink = $(this);
        var curBlock = $(curLink.attr('href'));
        if (curBlock.length == 1) {
            if (windowScroll + windowHeight / 2 > curBlock.offset().top) {
                $('.cityform-menu-list ul li.active').removeClass('active');
                curLink.parent().addClass('active');
                $('.cityform-menu-current').html(curLink.html());
            }
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
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('ajax-form')) {
                curForm.addClass('loading');
                var formData = new FormData(form);

                if (curForm.find('[type=file]').length != 0) {
                    var file = curForm.find('[type=file]')[0].files[0];
                    formData.append('file', file);
                }

                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    data: formData,
                    cache: false
                }).done(function(data) {
                    if (data.status) {
                        curForm.html('');
                        curForm.html('<div class="message message-success"><div class="message-title">' + data.message + '</div><div class="message-text">' + data.title + '</div></div>')
                    } else {
                        curForm.find('.message').remove();
                        curForm.prepend('<div class="message message-error"><div class="message-title">' + data.message + '</div><div class="message-text">' + data.title + '</div></div>')
                    }
                    curForm.removeClass('loading');
                });
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow, url) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
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

		if ( url )
		{
			history.pushState( '', '', url );

			$( '.window-title-social-item-vk' ).attr( 'href', 'https://vk.com/share.php?url=http://' + document.domain + url );
			$( '.window-title-social-item-fb' ).attr( 'href', 'https://www.facebook.com/sharer/sharer.php?u=http://' + document.domain + url );
		}
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        if (!$('.window').hasClass('changed')) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
            $('.wrapper').css({'top': 0});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            if (confirm('Закрыть форму?')) {
                $('.window').removeClass('changed');
                windowClose();
            }
        }
    }

	if ( $( '#ownd-url-base' ).length )
	{
		history.pushState( '', '', $( '#ownd-url-base' ).val() );
	}
}

$(document).ready(function() {
    $('body').on('change', '.window input, .window select', function(e) {
        $('.window').addClass('changed');
    });
});

$(window).on('load resize', function() {
    $('.programm-filter-window-checkboxes-speakers').each(function() {
        if ($(window).width() < 1200) {
            $(this).mCustomScrollbar('destroy');
        } else {
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
        }
    });
});

var captchaKey = '6Ldk5DMUAAAAALWRTOM96EQI_0OApr59RQHoMirA';
var captchaArray = [];

var onloadCallback = function() {
    $('.g-recaptcha').each(function() {
        var newCaptcha = grecaptcha.render(this, {
            'sitekey' : captchaKey,
            'callback' : verifyCallback,
        });
        captchaArray.push([newCaptcha, $(this)]);
    });
};

var verifyCallback = function(response) {
    for (var i = 0; i < captchaArray.length; i++) {
        if (grecaptcha.getResponse(captchaArray[i][0])) {
            var curInput = captchaArray[i][1].next();
            curInput.val(response);
            curInput.removeClass('error');
            curInput.parent().find('label.error').remove();
        }
    }
};

$(document).ready(function() {
    $('body').on('mouseenter', '.cityform-russia-scheme-img g, .chart-bar-row-data, .cityform-moscow-structure-row-scheme-item, .cityform-factor-moscow-district', function(e) {
        if ($(window).width() > 1199) {
            $('.window-hint').remove();
            $('.wrapper').append('<div class="window-hint"><div class="window-hint-inner">' + $(this).attr('data-title') + ': <span>' + $(this).attr('data-value') + '</span></div></div>');
            var curLeft = e.pageX;
            var curTop = e.pageY;
            $('.window-hint').css({'left': curLeft, 'top': curTop});
            if ($('.window-hint-inner').offset().left + $('.window-hint-inner').outerWidth() > $('.wrapper').width()) {
                $('.window-hint').addClass('to-right');
            }
        }
    });

    $('body').on('mousemove', '.cityform-russia-scheme-img g, .chart-bar-row-data, .cityform-moscow-structure-row-scheme-item, .cityform-factor-moscow-district', function(e) {
        if ($(window).width() > 1199) {
            var curLeft = e.pageX;
            var curTop = e.pageY;
            $('.window-hint').css({'left': curLeft, 'top': curTop});
            if ($('.window-hint-inner').offset().left + $('.window-hint-inner').outerWidth() > $('.wrapper').width()) {
                $('.window-hint').addClass('to-right');
            }
            if ($('.window-hint').offset().left < 0) {
                $('.window-hint').removeClass('to-right');
            }
        }
    });

    $('body').on('mouseleave', '.cityform-russia-scheme-img g, .chart-bar-row-data, .cityform-moscow-structure-row-scheme-item, .cityform-factor-moscow-district', function(e) {
        if ($(window).width() > 1119) {
            $('.window-hint').remove();
        }
    });
});

function createRussiaMap(curBlock, data) {

    var newHTML = '';

    newHTML +=  '<div class="cityform-russia-scheme-img"><svg viewBox="0 0 1107.77 630.12" fill="none" xmlns="http://www.w3.org/2000/svg"></svg></div>';

    var curData = data.data;

    newHTML +=  '<div class="cityform-epidemic-scheme-legend">' +
                    '<div class="cityform-epidemic-scheme-legend-title">' + data.legend + '</div>' +
                    '<div class="cityform-epidemic-scheme-legend-list">';
    for (var i = 0; i < data.ranges.length; i++) {
        newHTML +=      '<div class="cityform-epidemic-scheme-legend-item">' +
                            '<div class="cityform-epidemic-scheme-legend-item-line" style="background:' + data.ranges[i][2] + '"></div>' +
                            '<div class="cityform-epidemic-scheme-legend-item-text">' + data.ranges[i][3] + '</div>' +
                        '</div>';
    }
    newHTML +=      '</div>' +
                '</div>';

    curBlock.html(newHTML);

    if (curData !== null) {
        var newMap = '';

        for (var j = 0; j < russiaRegions.length; j++) {
            var curRegion = russiaRegions[j];
            for (var i = 0; i < curData.length; i++) {
                if (curRegion.id == curData[i][0]) {
                    var curColorIndex = -1;
                    var curValue = Math.round(curData[i][1]);
                    for (var c = 0; c < data.ranges.length; c++) {
                        if (curValue >= data.ranges[c][0] && curValue < data.ranges[c][1]) {
                            curColorIndex = c;
                        }
                        if (curValue == 0) {
                            curColorIndex = 0;
                        }
                    }

                    var curColor = data.ranges[curColorIndex][2];

                    newMap += '<g style="fill:' + curColor + '" data-title="' + curRegion.title + '" data-value="' + curValue + data.unit + '">' + curRegion.svg + '</g>';
                }
            }
        }
        curBlock.find('.cityform-russia-scheme-img svg').html(newMap);
    }

}

function createBarChart(curBlock, data) {

    var newHTML = '';

    newHTML +=  '<div class="chart-bar">';

    var curData = data.data;

    if (curData !== null) {
        var curMax = 0;
        var isInvert = false;
        if (typeof(data.subzero) != 'undefined' && data.subzero == true) {
            curMax = Infinity;
            isInvert = true;
        }
        for (var i = 0; i < curData.length; i++) {
            curValue = curData[i].value;
            if (isInvert) {
                if (curMax > curValue) {
                    curMax = curValue;
                }
            } else {
                if (curMax < curValue) {
                    curMax = curValue;
                }
            }
        }

        var showValue = false;
        if (typeof(data.showvalue) != 'undefined' && data.showvalue == true) {
            showValue = true;
        }

        var stepMax = Math.ceil(curMax);
        if (showValue) {
            stepMax++;
        }
        if (isInvert) {
            stepMax = Math.floor(curMax);
            if (showValue) {
                stepMax--;
            }
        }
        var stepSize = stepMax / 6;
        var steps = [];
        for (var i = 0; i < 7; i++) {
            steps.push(Math.ceil(i * stepSize));
        }

        var legendUnit = '';
        if (typeof(data.legendunit) != 'undefined') {
            legendUnit = data.legendunit;
        }

        for (var i = 0; i < curData.length; i++) {
            var classMain = '';
            if (typeof(curData[i].main) != 'undefined' && curData[i].main == true) {
                classMain = 'chart-bar-row-main'
            }
            newHTML +=  '<div class="chart-bar-row chart-bar-row-data ' + classMain + '" data-title="' + curData[i].title + '" data-value="' + curData[i].value + legendUnit + '">' +
                            '<div class="chart-bar-row-title">' + curData[i].title + '</div>' +
                            '<div class="chart-bar-row-value">' +
                                '<div class="chart-bar-row-back">';
            for (var j = 0; j < steps.length; j++) {
                newHTML +=          '<div class="chart-bar-row-back-item" style="left:' + (steps[j] / stepMax * 100) + '%"></div>';
            }
            newHTML +=          '</div>' +
                                '<div class="chart-bar-row-line" style="width:' + (curData[i].value / stepMax * 100) + '%"></div>';
            if (showValue) {
                    newHTML +=  '<div class="chart-bar-row-value-text">' + curData[i].value + '</div>';
            }

            newHTML +=      '</div>' +
                        '</div>';
        }

        newHTML +=      '<div class="chart-bar-row">' +
                            '<div class="chart-bar-row-title">&nbsp;</div>' +
                            '<div class="chart-bar-row-value">' +
                                '<div class="chart-bar-row-scale">';
        for (var j = 0; j < steps.length; j++) {
            newHTML +=              '<div class="chart-bar-row-scale-item" style="left:' + (steps[j] / stepMax * 100) + '%">' + steps[j] + legendUnit + '</div>';
        }
        newHTML +=              '</div>' +
                            '</div>' +
                        '</div>';
    }

    newHTML +=  '</div>';

    curBlock.html(newHTML);
}

function createStackChart(curBlock, data) {
    var newHTML = '';

    var curData = data.data;

    if (curData !== null) {
        var legendUnit = '';
        if (typeof(data.legendunit) != 'undefined') {
            legendUnit = data.legendunit;
        }


        for (var i = 0; i < curData.length; i++) {
            newHTML +=  '<div class="cityform-moscow-structure-row">' +
                            '<div class="cityform-moscow-structure-row-title">' + curData[i].title + '<img src="' + curData[i].icon + '" alt="" /></div>' +
                            '<div class="cityform-moscow-structure-row-scheme">';
            var rowHTML = '';
            for (var j = 0; j < curData[i].values.length; j++) {
                var curValue = curData[i].values[j];
                if (curValue > 0) {
                    var curColor = data.ranges[j][0];
                    var classInverse = '';
                    if (j == 0) {
                        classInverse = 'cityform-moscow-structure-row-scheme-item-inverse';
                    }

                    rowHTML = '<div class="cityform-moscow-structure-row-scheme-item ' + classInverse + '" data-title="' + data.ranges[j][1] + '" data-value="' + curValue + legendUnit + '" style="background:' + curColor + '; width:' + curValue + '%; height:' + curValue + '%"><span>' + curValue + legendUnit + '</span></div>' + rowHTML;
                }
            }
            newHTML +=      rowHTML + '</div>' +
                        '</div>';
        }
    }

    newHTML +=  '<div class="cityform-moscow-structure-legend">';
    var legendHTML = '';
    for (var i = 0; i < data.ranges.length; i++) {
        legendHTML =    '<div class="cityform-moscow-structure-legend-item">' +
                            '<div class="cityform-moscow-structure-legend-item-line" style="background-color:' + data.ranges[i][0] + '"></div>' +
                            '<div class="cityform-moscow-structure-legend-item-text">' + data.ranges[i][1] + '<span>' + data.ranges[i][2] + '</span></div>' +
                        '</div>' + legendHTML;
    }
    newHTML +=  legendHTML + '</div>';

    curBlock.html(newHTML);
}

function createMoscowMap(curBlock, data) {
    var curData = data.data;

    if (curData !== null) {
        var newMap =    '<svg viewBox="0 0 650 648" fill="none" xmlns="http://www.w3.org/2000/svg">';

        for (var j = 0; j < moscowDistricts.length; j++) {
            var curRegion = moscowDistricts[j];
            for (var i = 0; i < curData.length; i++) {
                if (curRegion.id == curData[i][0]) {
                    var curColorIndex = -1;
                    var curValue = (curData[i][1]).toFixed(3);
                    for (var c = 0; c < data.ranges.length; c++) {
                        if (curValue >= data.ranges[c][0] && curValue < data.ranges[c][1]) {
                            curColorIndex = c;
                        }
                        if (curValue == 0) {
                            curColorIndex = 0;
                        }
                    }

                    var curColor = data.ranges[curColorIndex][2];
                    var curColorTitle = data.ranges[curColorIndex][3];

                    newMap += '<g class="cityform-factor-moscow-district" style="fill:' + curColor + '" data-title="' + curRegion.title + '" data-value="' + curColorTitle + ' (' + (curValue * 100).toFixed(1) + '%)">' + curRegion.svg + '</g>';
                }
            }
        }

        newMap +=       '<path d="M153.94 143.718H64.9399V181.718H153.94V143.718Z" fill="white"/>' +
                            '<path d="M85.4839 168.898C84.0319 168.898 82.8799 168.508 82.0279 167.728C81.1759 166.948 80.6779 165.886 80.5339 164.542H82.8199C83.0599 166.162 83.9539 166.972 85.5019 166.972C86.3059 166.972 86.9179 166.786 87.3379 166.414C87.7579 166.03 87.9679 165.496 87.9679 164.812C87.9679 164.14 87.7819 163.66 87.4099 163.372C87.0379 163.072 86.4079 162.922 85.5199 162.922H84.0619V161.266H85.4839C86.8519 161.266 87.5359 160.63 87.5359 159.358C87.5359 158.782 87.3619 158.344 87.0139 158.044C86.6659 157.732 86.1679 157.576 85.5199 157.576C84.8239 157.576 84.2899 157.75 83.9179 158.098C83.5579 158.434 83.3059 158.956 83.1619 159.664H80.9119C81.0679 158.368 81.5479 157.378 82.3519 156.694C83.1679 156.01 84.2539 155.668 85.6099 155.668C86.8939 155.668 87.9319 155.992 88.7239 156.64C89.5279 157.288 89.9299 158.134 89.9299 159.178C89.9299 159.874 89.7499 160.474 89.3899 160.978C89.0299 161.482 88.4959 161.836 87.7879 162.04C88.6519 162.172 89.3059 162.49 89.7499 162.994C90.2059 163.486 90.4339 164.134 90.4339 164.938C90.4339 166.114 89.9719 167.068 89.0479 167.8C88.1359 168.532 86.9479 168.898 85.4839 168.898ZM96.6435 168.898C95.2275 168.898 94.0755 168.466 93.1875 167.602C92.3115 166.738 91.8735 165.574 91.8735 164.11V163.966C91.8735 162.526 92.3115 161.356 93.1875 160.456C94.0755 159.556 95.1975 159.106 96.5535 159.106C97.8255 159.106 98.8815 159.502 99.7215 160.294C100.574 161.086 101 162.274 101 163.858V164.488H94.1055C94.1415 165.388 94.3755 166.078 94.8075 166.558C95.2515 167.038 95.8815 167.278 96.6975 167.278C97.9695 167.278 98.6895 166.798 98.8575 165.838H100.964C100.808 166.834 100.352 167.596 99.5955 168.124C98.8515 168.64 97.8675 168.898 96.6435 168.898ZM98.8395 163.03C98.7195 161.47 97.9575 160.69 96.5535 160.69C95.9055 160.69 95.3655 160.9 94.9335 161.32C94.5135 161.728 94.2495 162.298 94.1415 163.03H98.8395ZM105.589 164.938C105.469 166.282 105.205 167.272 104.797 167.908C104.401 168.544 103.777 168.862 102.925 168.862C102.637 168.862 102.433 168.844 102.313 168.808C102.289 168.796 102.253 168.778 102.205 168.754C102.169 168.742 102.145 168.736 102.133 168.736V166.918L102.241 166.954C102.361 166.978 102.469 166.99 102.565 166.99C102.901 166.99 103.147 166.792 103.303 166.396C103.471 165.988 103.597 165.382 103.681 164.578C103.705 164.35 103.723 164.056 103.735 163.696C103.747 163.336 103.759 162.928 103.771 162.472C103.795 162.004 103.813 161.632 103.825 161.356L103.879 159.304H110.737V168.718H108.577V160.924H105.787C105.691 163.096 105.625 164.434 105.589 164.938ZM116.826 155.848H119.958L124.206 168.718H121.722L120.696 165.532H115.782L114.774 168.718H112.524L116.826 155.848ZM116.34 163.786H120.138L118.248 157.81L116.34 163.786ZM131.353 166.972C132.565 166.972 133.525 166.552 134.233 165.712C134.953 164.86 135.313 163.732 135.313 162.328V162.184C135.313 160.828 134.953 159.724 134.233 158.872C133.525 158.008 132.553 157.576 131.317 157.576C130.069 157.576 129.085 157.996 128.365 158.836C127.657 159.676 127.303 160.798 127.303 162.202V162.346C127.303 163.738 127.681 164.86 128.437 165.712C129.193 166.552 130.165 166.972 131.353 166.972ZM131.317 168.898C129.373 168.898 127.801 168.28 126.601 167.044C125.401 165.808 124.801 164.248 124.801 162.364V162.22C124.801 160.324 125.407 158.758 126.619 157.522C127.843 156.286 129.409 155.668 131.317 155.668C133.225 155.668 134.779 156.28 135.979 157.504C137.191 158.716 137.797 160.27 137.797 162.166V162.31C137.797 164.206 137.197 165.778 135.997 167.026C134.809 168.274 133.249 168.898 131.317 168.898Z" fill="#4849A6"/>' +
                            '<path d="M153.44 144.218H65.4399V181.218H153.44V144.218Z" stroke="#4849A6"/>' +
                            '<path d="M276.348 49.8096H194.348V87.8096H276.348V49.8096Z" fill="white"/>' +
                            '<path d="M216.458 74.9896C214.466 74.9896 212.918 74.4016 211.814 73.2256C210.722 72.0496 210.176 70.4596 210.176 68.4556V68.3116C210.176 66.3916 210.764 64.8196 211.94 63.5956C213.116 62.3596 214.61 61.7416 216.422 61.7416C217.958 61.7416 219.224 62.1256 220.22 62.8936C221.228 63.6616 221.804 64.7776 221.948 66.2416H219.518C219.386 65.3656 219.068 64.7176 218.564 64.2976C218.072 63.8656 217.364 63.6496 216.44 63.6496C215.312 63.6496 214.406 64.0696 213.722 64.9096C213.038 65.7376 212.696 66.8656 212.696 68.2936V68.4376C212.696 69.8896 213.026 71.0236 213.686 71.8396C214.346 72.6436 215.27 73.0456 216.458 73.0456C217.37 73.0456 218.114 72.8176 218.69 72.3616C219.266 71.8936 219.62 71.2156 219.752 70.3276H222.092C221.912 71.8516 221.318 73.0096 220.31 73.8016C219.314 74.5936 218.03 74.9896 216.458 74.9896ZM228.233 74.9896C226.781 74.9896 225.629 74.5996 224.777 73.8196C223.925 73.0396 223.427 71.9776 223.283 70.6336H225.569C225.809 72.2536 226.703 73.0636 228.251 73.0636C229.055 73.0636 229.667 72.8776 230.087 72.5056C230.507 72.1216 230.717 71.5876 230.717 70.9036C230.717 70.2316 230.531 69.7516 230.159 69.4636C229.787 69.1636 229.157 69.0136 228.269 69.0136H226.811V67.3576H228.233C229.601 67.3576 230.285 66.7216 230.285 65.4496C230.285 64.8736 230.111 64.4356 229.763 64.1356C229.415 63.8236 228.917 63.6676 228.269 63.6676C227.573 63.6676 227.039 63.8416 226.667 64.1896C226.307 64.5256 226.055 65.0476 225.911 65.7556H223.661C223.817 64.4596 224.297 63.4696 225.101 62.7856C225.917 62.1016 227.003 61.7596 228.359 61.7596C229.643 61.7596 230.681 62.0836 231.473 62.7316C232.277 63.3796 232.679 64.2256 232.679 65.2696C232.679 65.9656 232.499 66.5656 232.139 67.0696C231.779 67.5736 231.245 67.9276 230.537 68.1316C231.401 68.2636 232.055 68.5816 232.499 69.0856C232.955 69.5776 233.183 70.2256 233.183 71.0296C233.183 72.2056 232.721 73.1596 231.797 73.8916C230.885 74.6236 229.697 74.9896 228.233 74.9896ZM238.569 61.9396H241.701L245.949 74.8096H243.465L242.439 71.6236H237.525L236.517 74.8096H234.267L238.569 61.9396ZM238.083 69.8776H241.881L239.991 63.9016L238.083 69.8776ZM253.097 73.0636C254.309 73.0636 255.269 72.6436 255.977 71.8036C256.697 70.9516 257.057 69.8236 257.057 68.4196V68.2756C257.057 66.9196 256.697 65.8156 255.977 64.9636C255.269 64.0996 254.297 63.6676 253.061 63.6676C251.813 63.6676 250.829 64.0876 250.109 64.9276C249.401 65.7676 249.047 66.8896 249.047 68.2936V68.4376C249.047 69.8296 249.425 70.9516 250.181 71.8036C250.937 72.6436 251.909 73.0636 253.097 73.0636ZM253.061 74.9896C251.117 74.9896 249.545 74.3716 248.345 73.1356C247.145 71.8996 246.545 70.3396 246.545 68.4556V68.3116C246.545 66.4156 247.151 64.8496 248.363 63.6136C249.587 62.3776 251.153 61.7596 253.061 61.7596C254.969 61.7596 256.523 62.3716 257.723 63.5956C258.935 64.8076 259.541 66.3616 259.541 68.2576V68.4016C259.541 70.2976 258.941 71.8696 257.741 73.1176C256.553 74.3656 254.993 74.9896 253.061 74.9896Z" fill="#4849A6"/>' +
                            '<path d="M275.848 50.3096H194.848V87.3096H275.848V50.3096Z" stroke="#4849A6"/>' +
                            '<path d="M373.082 43.8096H303.082V81.8096H373.082V43.8096Z" fill="white"/>' +
                            '<path d="M325.192 68.9896C323.2 68.9896 321.652 68.4016 320.548 67.2256C319.456 66.0496 318.91 64.4596 318.91 62.4556V62.3116C318.91 60.3916 319.498 58.8196 320.674 57.5956C321.85 56.3596 323.344 55.7416 325.156 55.7416C326.692 55.7416 327.958 56.1256 328.954 56.8936C329.962 57.6616 330.538 58.7776 330.682 60.2416H328.252C328.12 59.3656 327.802 58.7176 327.298 58.2976C326.806 57.8656 326.098 57.6496 325.174 57.6496C324.046 57.6496 323.14 58.0696 322.456 58.9096C321.772 59.7376 321.43 60.8656 321.43 62.2936V62.4376C321.43 63.8896 321.76 65.0236 322.42 65.8396C323.08 66.6436 324.004 67.0456 325.192 67.0456C326.104 67.0456 326.848 66.8176 327.424 66.3616C328 65.8936 328.354 65.2156 328.486 64.3276H330.826C330.646 65.8516 330.052 67.0096 329.044 67.8016C328.048 68.5936 326.764 68.9896 325.192 68.9896ZM335.948 55.9396H339.08L343.328 68.8096H340.844L339.818 65.6236H334.904L333.896 68.8096H331.646L335.948 55.9396ZM335.462 63.8776H339.26L337.37 57.9016L335.462 63.8776ZM350.475 67.0636C351.687 67.0636 352.647 66.6436 353.355 65.8036C354.075 64.9516 354.435 63.8236 354.435 62.4196V62.2756C354.435 60.9196 354.075 59.8156 353.355 58.9636C352.647 58.0996 351.675 57.6676 350.439 57.6676C349.191 57.6676 348.207 58.0876 347.487 58.9276C346.779 59.7676 346.425 60.8896 346.425 62.2936V62.4376C346.425 63.8296 346.803 64.9516 347.559 65.8036C348.315 66.6436 349.287 67.0636 350.475 67.0636ZM350.439 68.9896C348.495 68.9896 346.923 68.3716 345.723 67.1356C344.523 65.8996 343.923 64.3396 343.923 62.4556V62.3116C343.923 60.4156 344.529 58.8496 345.741 57.6136C346.965 56.3776 348.531 55.7596 350.439 55.7596C352.347 55.7596 353.901 56.3716 355.101 57.5956C356.313 58.8076 356.919 60.3616 356.919 62.2576V62.4016C356.919 64.2976 356.319 65.8696 355.119 67.1176C353.931 68.3656 352.371 68.9896 350.439 68.9896Z" fill="#4849A6"/>' +
                            '<path d="M372.582 44.3096H303.582V81.3096H372.582V44.3096Z" stroke="#4849A6"/>' +
                            '<path d="M471.99 44.9873H389.99V82.9873H471.99V44.9873Z" fill="white"/>' +
                            '<path d="M412.1 70.1673C410.108 70.1673 408.56 69.5793 407.456 68.4033C406.364 67.2273 405.818 65.6373 405.818 63.6333V63.4893C405.818 61.5693 406.406 59.9973 407.582 58.7733C408.758 57.5373 410.252 56.9193 412.064 56.9193C413.6 56.9193 414.866 57.3033 415.862 58.0713C416.87 58.8393 417.446 59.9553 417.59 61.4193H415.16C415.028 60.5433 414.71 59.8953 414.206 59.4753C413.714 59.0433 413.006 58.8273 412.082 58.8273C410.954 58.8273 410.048 59.2473 409.364 60.0873C408.68 60.9153 408.338 62.0433 408.338 63.4713V63.6153C408.338 65.0673 408.668 66.2013 409.328 67.0173C409.988 67.8213 410.912 68.2233 412.1 68.2233C413.012 68.2233 413.756 67.9953 414.332 67.5393C414.908 67.0713 415.262 66.3933 415.394 65.5053H417.734C417.554 67.0293 416.96 68.1873 415.952 68.9793C414.956 69.7713 413.672 70.1673 412.1 70.1673ZM419.808 57.1173H424.416C427.224 57.1173 428.628 58.2333 428.628 60.4653V60.5373C428.628 61.9413 427.95 62.8533 426.594 63.2733C427.47 63.4653 428.118 63.8073 428.538 64.2993C428.958 64.7793 429.168 65.4513 429.168 66.3153V66.3873C429.168 67.5753 428.79 68.4753 428.034 69.0873C427.278 69.6873 426.186 69.9873 424.758 69.9873H419.808V57.1173ZM424.47 68.2773C426.03 68.2773 426.81 67.5933 426.81 66.2253V66.1533C426.81 65.4693 426.612 64.9653 426.216 64.6413C425.82 64.3173 425.184 64.1553 424.308 64.1553H422.148V68.2773H424.47ZM424.128 62.5353C424.908 62.5353 425.466 62.3853 425.802 62.0853C426.15 61.7853 426.324 61.3053 426.324 60.6453V60.5733C426.324 59.9613 426.144 59.5173 425.784 59.2413C425.424 58.9653 424.86 58.8273 424.092 58.8273H422.148V62.5353H424.128ZM434.528 57.1173H437.66L441.908 69.9873H439.424L438.398 66.8013H433.484L432.476 69.9873H430.226L434.528 57.1173ZM434.042 65.0553H437.84L435.95 59.0793L434.042 65.0553ZM449.056 68.2413C450.268 68.2413 451.228 67.8213 451.936 66.9813C452.656 66.1293 453.016 65.0013 453.016 63.5973V63.4533C453.016 62.0973 452.656 60.9933 451.936 60.1413C451.228 59.2773 450.256 58.8453 449.02 58.8453C447.772 58.8453 446.788 59.2653 446.068 60.1053C445.36 60.9453 445.006 62.0673 445.006 63.4713V63.6153C445.006 65.0073 445.384 66.1293 446.14 66.9813C446.896 67.8213 447.868 68.2413 449.056 68.2413ZM449.02 70.1673C447.076 70.1673 445.504 69.5493 444.304 68.3133C443.104 67.0773 442.504 65.5173 442.504 63.6333V63.4893C442.504 61.5933 443.11 60.0273 444.322 58.7913C445.546 57.5553 447.112 56.9373 449.02 56.9373C450.928 56.9373 452.482 57.5493 453.682 58.7733C454.894 59.9853 455.5 61.5393 455.5 63.4353V63.5793C455.5 65.4753 454.9 67.0473 453.7 68.2953C452.512 69.5433 450.952 70.1673 449.02 70.1673Z" fill="#4849A6"/>' +
                            '<path d="M471.49 45.4873H390.49V82.4873H471.49V45.4873Z" stroke="#4849A6"/>' +
                            '<path d="M549.279 129.718H480.279V167.718H549.279V129.718Z" fill="white"/>' +
                            '<path d="M496.755 141.848H501.363C504.171 141.848 505.575 142.964 505.575 145.196V145.268C505.575 146.672 504.897 147.584 503.541 148.004C504.417 148.196 505.065 148.538 505.485 149.03C505.905 149.51 506.115 150.182 506.115 151.046V151.118C506.115 152.306 505.737 153.206 504.981 153.818C504.225 154.418 503.133 154.718 501.705 154.718H496.755V141.848ZM501.417 153.008C502.977 153.008 503.757 152.324 503.757 150.956V150.884C503.757 150.2 503.559 149.696 503.163 149.372C502.767 149.048 502.131 148.886 501.255 148.886H499.095V153.008H501.417ZM501.075 147.266C501.855 147.266 502.413 147.116 502.749 146.816C503.097 146.516 503.271 146.036 503.271 145.376V145.304C503.271 144.692 503.091 144.248 502.731 143.972C502.371 143.696 501.807 143.558 501.039 143.558H499.095V147.266H501.075ZM511.475 141.848H514.607L518.855 154.718H516.371L515.345 151.532H510.431L509.423 154.718H507.173L511.475 141.848ZM510.989 149.786H514.787L512.897 143.81L510.989 149.786ZM526.003 152.972C527.215 152.972 528.175 152.552 528.883 151.712C529.603 150.86 529.963 149.732 529.963 148.328V148.184C529.963 146.828 529.603 145.724 528.883 144.872C528.175 144.008 527.203 143.576 525.967 143.576C524.719 143.576 523.735 143.996 523.015 144.836C522.307 145.676 521.953 146.798 521.953 148.202V148.346C521.953 149.738 522.331 150.86 523.087 151.712C523.843 152.552 524.815 152.972 526.003 152.972ZM525.967 154.898C524.023 154.898 522.451 154.28 521.251 153.044C520.051 151.808 519.451 150.248 519.451 148.364V148.22C519.451 146.324 520.057 144.758 521.269 143.522C522.493 142.286 524.059 141.668 525.967 141.668C527.875 141.668 529.429 142.28 530.629 143.504C531.841 144.716 532.447 146.27 532.447 148.166V148.31C532.447 150.206 531.847 151.778 530.647 153.026C529.459 154.274 527.899 154.898 525.967 154.898Z" fill="#4849A6"/>' +
                            '<path d="M548.779 130.218H480.779V167.218H548.779V130.218Z" stroke="#4849A6"/>' +
                            '<path d="M552.888 497.606H465.888V535.606H552.888V497.606Z" fill="white"/>' +
                            '<path d="M492.75 522.786C491.01 522.786 489.576 522.264 488.448 521.22C487.32 520.164 486.666 518.802 486.486 517.134H484.776V522.606H482.364V509.736H484.776V515.208H486.504C486.696 513.552 487.362 512.202 488.502 511.158C489.642 510.102 491.058 509.574 492.75 509.574C494.61 509.574 496.122 510.186 497.286 511.41C498.45 512.622 499.032 514.17 499.032 516.054V516.198C499.032 518.106 498.456 519.684 497.304 520.932C496.152 522.168 494.634 522.786 492.75 522.786ZM492.786 520.86C493.962 520.86 494.88 520.44 495.54 519.6C496.212 518.748 496.548 517.614 496.548 516.198V516.054C496.548 514.686 496.212 513.582 495.54 512.742C494.88 511.89 493.95 511.464 492.75 511.464C491.55 511.464 490.614 511.884 489.942 512.724C489.27 513.552 488.934 514.674 488.934 516.09V516.234C488.934 517.626 489.288 518.748 489.996 519.6C490.716 520.44 491.646 520.86 492.786 520.86ZM501.33 509.736H505.938C508.746 509.736 510.15 510.852 510.15 513.084V513.156C510.15 514.56 509.472 515.472 508.116 515.892C508.992 516.084 509.64 516.426 510.06 516.918C510.48 517.398 510.69 518.07 510.69 518.934V519.006C510.69 520.194 510.312 521.094 509.556 521.706C508.8 522.306 507.708 522.606 506.28 522.606H501.33V509.736ZM505.992 520.896C507.552 520.896 508.332 520.212 508.332 518.844V518.772C508.332 518.088 508.134 517.584 507.738 517.26C507.342 516.936 506.706 516.774 505.83 516.774H503.67V520.896H505.992ZM505.65 515.154C506.43 515.154 506.988 515.004 507.324 514.704C507.672 514.404 507.846 513.924 507.846 513.264V513.192C507.846 512.58 507.666 512.136 507.306 511.86C506.946 511.584 506.382 511.446 505.614 511.446H503.67V515.154H505.65ZM516.051 509.736H519.183L523.431 522.606H520.947L519.921 519.42H515.007L513.999 522.606H511.749L516.051 509.736ZM515.565 517.674H519.363L517.473 511.698L515.565 517.674ZM530.578 520.86C531.79 520.86 532.75 520.44 533.458 519.6C534.178 518.748 534.538 517.62 534.538 516.216V516.072C534.538 514.716 534.178 513.612 533.458 512.76C532.75 511.896 531.778 511.464 530.542 511.464C529.294 511.464 528.31 511.884 527.59 512.724C526.882 513.564 526.528 514.686 526.528 516.09V516.234C526.528 517.626 526.906 518.748 527.662 519.6C528.418 520.44 529.39 520.86 530.578 520.86ZM530.542 522.786C528.598 522.786 527.026 522.168 525.826 520.932C524.626 519.696 524.026 518.136 524.026 516.252V516.108C524.026 514.212 524.632 512.646 525.844 511.41C527.068 510.174 528.634 509.556 530.542 509.556C532.45 509.556 534.004 510.168 535.204 511.392C536.416 512.604 537.022 514.158 537.022 516.054V516.198C537.022 518.094 536.422 519.666 535.222 520.914C534.034 522.162 532.474 522.786 530.542 522.786Z" fill="#4849A6"/>' +
                            '<path d="M552.388 498.106H466.388V535.106H552.388V498.106Z" stroke="#4849A6"/>' +
                            '<path d="M460.022 549.396H385.022V587.396H460.022V549.396Z" fill="white"/>' +
                            '<path d="M411.884 574.576C410.144 574.576 408.71 574.054 407.582 573.01C406.454 571.954 405.8 570.592 405.62 568.924H403.91V574.396H401.498V561.526H403.91V566.998H405.638C405.83 565.342 406.496 563.992 407.636 562.948C408.776 561.892 410.192 561.364 411.884 561.364C413.744 561.364 415.256 561.976 416.42 563.2C417.584 564.412 418.166 565.96 418.166 567.844V567.988C418.166 569.896 417.59 571.474 416.438 572.722C415.286 573.958 413.768 574.576 411.884 574.576ZM411.92 572.65C413.096 572.65 414.014 572.23 414.674 571.39C415.346 570.538 415.682 569.404 415.682 567.988V567.844C415.682 566.476 415.346 565.372 414.674 564.532C414.014 563.68 413.084 563.254 411.884 563.254C410.684 563.254 409.748 563.674 409.076 564.514C408.404 565.342 408.068 566.464 408.068 567.88V568.024C408.068 569.416 408.422 570.538 409.13 571.39C409.85 572.23 410.78 572.65 411.92 572.65ZM423.057 561.526H426.189L430.437 574.396H427.953L426.927 571.21H422.013L421.005 574.396H418.755L423.057 561.526ZM422.571 569.464H426.369L424.479 563.488L422.571 569.464ZM437.584 572.65C438.796 572.65 439.756 572.23 440.464 571.39C441.184 570.538 441.544 569.41 441.544 568.006V567.862C441.544 566.506 441.184 565.402 440.464 564.55C439.756 563.686 438.784 563.254 437.548 563.254C436.3 563.254 435.316 563.674 434.596 564.514C433.888 565.354 433.534 566.476 433.534 567.88V568.024C433.534 569.416 433.912 570.538 434.668 571.39C435.424 572.23 436.396 572.65 437.584 572.65ZM437.548 574.576C435.604 574.576 434.032 573.958 432.832 572.722C431.632 571.486 431.032 569.926 431.032 568.042V567.898C431.032 566.002 431.638 564.436 432.85 563.2C434.074 561.964 435.64 561.346 437.548 561.346C439.456 561.346 441.01 561.958 442.21 563.182C443.422 564.394 444.028 565.948 444.028 567.844V567.988C444.028 569.884 443.428 571.456 442.228 572.704C441.04 573.952 439.48 574.576 437.548 574.576Z" fill="#4849A6"/>' +
                            '<path d="M459.522 549.896H385.522V586.896H459.522V549.896Z" stroke="#4849A6"/>' +
                            '<path d="M308.656 509.606H221.656V547.606H308.656V509.606Z" fill="white"/>' +
                            '<path d="M248.518 534.786C246.778 534.786 245.344 534.264 244.216 533.22C243.088 532.164 242.434 530.802 242.254 529.134H240.544V534.606H238.132V521.736H240.544V527.208H242.272C242.464 525.552 243.13 524.202 244.27 523.158C245.41 522.102 246.826 521.574 248.518 521.574C250.378 521.574 251.89 522.186 253.054 523.41C254.218 524.622 254.8 526.17 254.8 528.054V528.198C254.8 530.106 254.224 531.684 253.072 532.932C251.92 534.168 250.402 534.786 248.518 534.786ZM248.554 532.86C249.73 532.86 250.648 532.44 251.308 531.6C251.98 530.748 252.316 529.614 252.316 528.198V528.054C252.316 526.686 251.98 525.582 251.308 524.742C250.648 523.89 249.718 523.464 248.518 523.464C247.318 523.464 246.382 523.884 245.71 524.724C245.038 525.552 244.702 526.674 244.702 528.09V528.234C244.702 529.626 245.056 530.748 245.764 531.6C246.484 532.44 247.414 532.86 248.554 532.86ZM261.079 534.786C259.627 534.786 258.475 534.396 257.623 533.616C256.771 532.836 256.273 531.774 256.129 530.43H258.415C258.655 532.05 259.549 532.86 261.097 532.86C261.901 532.86 262.513 532.674 262.933 532.302C263.353 531.918 263.563 531.384 263.563 530.7C263.563 530.028 263.377 529.548 263.005 529.26C262.633 528.96 262.003 528.81 261.115 528.81H259.657V527.154H261.079C262.447 527.154 263.131 526.518 263.131 525.246C263.131 524.67 262.957 524.232 262.609 523.932C262.261 523.62 261.763 523.464 261.115 523.464C260.419 523.464 259.885 523.638 259.513 523.986C259.153 524.322 258.901 524.844 258.757 525.552H256.507C256.663 524.256 257.143 523.266 257.947 522.582C258.763 521.898 259.849 521.556 261.205 521.556C262.489 521.556 263.527 521.88 264.319 522.528C265.123 523.176 265.525 524.022 265.525 525.066C265.525 525.762 265.345 526.362 264.985 526.866C264.625 527.37 264.091 527.724 263.383 527.928C264.247 528.06 264.901 528.378 265.345 528.882C265.801 529.374 266.029 530.022 266.029 530.826C266.029 532.002 265.567 532.956 264.643 533.688C263.731 534.42 262.543 534.786 261.079 534.786ZM271.414 521.736H274.546L278.794 534.606H276.31L275.284 531.42H270.37L269.362 534.606H267.112L271.414 521.736ZM270.928 529.674H274.726L272.836 523.698L270.928 529.674ZM285.942 532.86C287.154 532.86 288.114 532.44 288.822 531.6C289.542 530.748 289.902 529.62 289.902 528.216V528.072C289.902 526.716 289.542 525.612 288.822 524.76C288.114 523.896 287.142 523.464 285.906 523.464C284.658 523.464 283.674 523.884 282.954 524.724C282.246 525.564 281.892 526.686 281.892 528.09V528.234C281.892 529.626 282.27 530.748 283.026 531.6C283.782 532.44 284.754 532.86 285.942 532.86ZM285.906 534.786C283.962 534.786 282.39 534.168 281.19 532.932C279.99 531.696 279.39 530.136 279.39 528.252V528.108C279.39 526.212 279.996 524.646 281.208 523.41C282.432 522.174 283.998 521.556 285.906 521.556C287.814 521.556 289.368 522.168 290.568 523.392C291.78 524.604 292.386 526.158 292.386 528.054V528.198C292.386 530.094 291.786 531.666 290.586 532.914C289.398 534.162 287.838 534.786 285.906 534.786Z" fill="#4849A6"/>' +
                            '<path d="M308.156 510.106H222.156V547.106H308.156V510.106Z" stroke="#4849A6"/>' +
                            '<path d="M260.465 470.064H192.465V508.064H260.465V470.064Z" fill="white"/>' +
                            '<path d="M213.009 495.244C211.557 495.244 210.405 494.854 209.553 494.074C208.701 493.294 208.203 492.232 208.059 490.888H210.345C210.585 492.508 211.479 493.318 213.027 493.318C213.831 493.318 214.443 493.132 214.863 492.76C215.283 492.376 215.493 491.842 215.493 491.158C215.493 490.486 215.307 490.006 214.935 489.718C214.563 489.418 213.933 489.268 213.045 489.268H211.587V487.612H213.009C214.377 487.612 215.061 486.976 215.061 485.704C215.061 485.128 214.887 484.69 214.539 484.39C214.191 484.078 213.693 483.922 213.045 483.922C212.349 483.922 211.815 484.096 211.443 484.444C211.083 484.78 210.831 485.302 210.687 486.01H208.437C208.593 484.714 209.073 483.724 209.877 483.04C210.693 482.356 211.779 482.014 213.135 482.014C214.419 482.014 215.457 482.338 216.249 482.986C217.053 483.634 217.455 484.48 217.455 485.524C217.455 486.22 217.275 486.82 216.915 487.324C216.555 487.828 216.021 488.182 215.313 488.386C216.177 488.518 216.831 488.836 217.275 489.34C217.731 489.832 217.959 490.48 217.959 491.284C217.959 492.46 217.497 493.414 216.573 494.146C215.661 494.878 214.473 495.244 213.009 495.244ZM223.345 482.194H226.477L230.725 495.064H228.241L227.215 491.878H222.301L221.293 495.064H219.043L223.345 482.194ZM222.859 490.132H226.657L224.767 484.156L222.859 490.132ZM237.872 493.318C239.084 493.318 240.044 492.898 240.752 492.058C241.472 491.206 241.832 490.078 241.832 488.674V488.53C241.832 487.174 241.472 486.07 240.752 485.218C240.044 484.354 239.072 483.922 237.836 483.922C236.588 483.922 235.604 484.342 234.884 485.182C234.176 486.022 233.822 487.144 233.822 488.548V488.692C233.822 490.084 234.2 491.206 234.956 492.058C235.712 492.898 236.684 493.318 237.872 493.318ZM237.836 495.244C235.892 495.244 234.32 494.626 233.12 493.39C231.92 492.154 231.32 490.594 231.32 488.71V488.566C231.32 486.67 231.926 485.104 233.138 483.868C234.362 482.632 235.928 482.014 237.836 482.014C239.744 482.014 241.298 482.626 242.498 483.85C243.71 485.062 244.316 486.616 244.316 488.512V488.656C244.316 490.552 243.716 492.124 242.516 493.372C241.328 494.62 239.768 495.244 237.836 495.244Z" fill="#4849A6"/>' +
                            '<path d="M259.965 470.564H192.965V507.564H259.965V470.564Z" stroke="#4849A6"/>' +
                            '<path d="M142.664 86.0859V143.718" stroke="#4849A6"/>' +
                            '<path d="M255.903 87.0039V192.435" stroke="#4849A6"/>' +
                            '<path d="M308.612 81.0039V165.422" stroke="#4849A6"/>' +
                            '<path d="M403.328 82.9873V173.193" stroke="#4849A6"/>' +
                            '<path d="M430.042 97.3311H359.042V135.331H430.042V97.3311Z" fill="white"/>' +
                            '<path d="M385.364 124.671L385.274 122.331H375.518V109.461H377.93V120.405H383.51V109.461H385.922V120.405H387.416V124.671H385.364ZM392.612 109.461H395.744L399.992 122.331H397.508L396.482 119.145H391.568L390.56 122.331H388.31L392.612 109.461ZM392.126 117.399H395.924L394.034 111.423L392.126 117.399ZM407.139 120.585C408.351 120.585 409.311 120.165 410.019 119.325C410.739 118.473 411.099 117.345 411.099 115.941V115.797C411.099 114.441 410.739 113.337 410.019 112.485C409.311 111.621 408.339 111.189 407.103 111.189C405.855 111.189 404.871 111.609 404.151 112.449C403.443 113.289 403.089 114.411 403.089 115.815V115.959C403.089 117.351 403.467 118.473 404.223 119.325C404.979 120.165 405.951 120.585 407.139 120.585ZM407.103 122.511C405.159 122.511 403.587 121.893 402.387 120.657C401.187 119.421 400.587 117.861 400.587 115.977V115.833C400.587 113.937 401.193 112.371 402.405 111.135C403.629 109.899 405.195 109.281 407.103 109.281C409.011 109.281 410.565 109.893 411.765 111.117C412.977 112.329 413.583 113.883 413.583 115.779V115.923C413.583 117.819 412.983 119.391 411.783 120.639C410.595 121.887 409.035 122.511 407.103 122.511Z" fill="#4849A6"/>' +
                            '<path d="M429.542 97.8311H359.542V134.831H429.542V97.8311Z" stroke="#4849A6"/>' +
                            '<path d="M372.512 134.709V169.073" stroke="#4849A6"/>' +
                            '<path d="M484.218 167.718V236.896" stroke="#4849A6"/>' +
                            '<path d="M253.368 418.524V470.064" stroke="#4849A6"/>' +
                            '<path d="M304.783 486.443V510.086" stroke="#4849A6"/>' +
                            '<path d="M388.087 510.179V549.395" stroke="#4849A6"/>' +
                            '<path d="M469.792 454.338V497.607" stroke="#4849A6"/>' +
                        '</svg>';

        curBlock.html(newMap);
    }
}

$(document).ready(function() {
    $('.voiting-form').each(function() {
        var curForm = $(this).find('form');
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }

        curForm.data('curStep', 0);
        $('.voiting-form-step').eq(0).addClass('active');
        $('.voiting-form-ctrl-status-current').html(1);
        $('.voiting-form-ctrl-status-count').html($('.voiting-form-step').length);

        $('.voiting-form-step').each(function() {
            var curStep = $(this);
            curStep.find('.voiting-form-nominees').sortable({
                axis: 'y',
                stop: function(event, ui) {
                    curStep.find('.voiting-form-nominee').each(function() {
                        var curNominee = $(this);
                        curNominee.find('.voiting-form-nominee-order').html((curNominee.index() + 1) + '.');
                    });
                }
            });
        });
    });

    $('.voiting-form-ctrl-btn a').click(function(e) {
        var curForm = $('.voiting-form form');
        var curStep = Number(curForm.data('curStep'));
        curStep++;
        curForm.data('curStep', curStep);
        if (curStep >= $('.voiting-form-step').length) {
            curForm.addClass('loading');
            var results = [];
            for (var i = 0; i < $('.voiting-form-step').length; i++) {
                var curItem = $('.voiting-form-step').eq(i);
                results.push([]);
                for (var j = 0; j < curItem.find('.voiting-form-nominee').length; j++) {
                    results[i].push(curItem.find('.voiting-form-nominee').eq(j).attr('data-id'));
                }
            }
            $.ajax({
                type: 'POST',
                url: curForm.attr('action'),
                dataType: 'json',
                data: JSON.stringify(results),
                cache: false
            }).done(function(data) {
                curForm.removeClass('loading');
                $('.voiting-form, .voiting-header').addClass('success');
                $('html, body').animate({'scrollTop': $('.voiting-form').offset().top - $('header').height() - 20});
            });
        } else {
            $('.voiting-form-step.active').removeClass('active');
            $('.voiting-form-step').eq(curStep).addClass('active');
            $('.voiting-form-ctrl-status-current').html(curStep + 1);
            $('html, body').animate({'scrollTop': $('.voiting-form form').offset().top - $('header').height() - 20});
        }
        e.preventDefault();
    });

    $('.award-nomination-2022-header').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.voiting-header-about-mobile-more a').click(function(e) {
        $('.voiting-header-about').toggleClass('open');
        e.preventDefault();
    });

    $('.big-table').each(function() {
        var curTable = $(this);
        curTable.wrap('<div class="big-table-scroll"></div>');
        curTable.parent().mCustomScrollbar({
            axis: 'x',
            scrollButtons: {
                enable: true
            }
        });
    });

});

$(window).on('load resize', function() {
    $('.award-nominants-2022').each(function() {
        var curList = $(this);

        curList.find('.award-nominant-2022-title').css({'min-height': '0px'});

        curList.find('.award-nominant-2022-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.parents().filter('.award-nominant-2022').offset().top;

            curList.find('.award-nominant-2022-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.parents().filter('.award-nominant-2022').offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.voiting-form-step').each(function() {
        var curStep = $(this);
        if ($(window).width() > 1199) {
            curStep.find('.voiting-form-nominees.ui-sortable').sortable('option', 'handle', false);
        } else {
            curStep.find('.voiting-form-nominees.ui-sortable').sortable('option', 'handle', '.voiting-form-nominee-move-icon');
        }
    });
});

$(document).ready(function() {

    $('.program-22-ctrl').each(function() {
        var newHTML = '';
        for (var i = 0; i < programm22Data.types.length; i++) {
            var curItem = programm22Data.types[i];
            newHTML += '<div class="form-checkbox"><label><input type="checkbox" name="type' + curItem.id + '" value="' + curItem.id + '" /><span><em style="background:' + curItem.color + '"></em>' + curItem.title + '</span></label>';
        }
        $('.programm-filter-window-checkboxes-types').html(newHTML);

        newHTML = '';
        for (var i = 0; i < programm22Data.weeks.length; i++) {
            var curItem = programm22Data.weeks[i];
            newHTML += '<a href="#" class="program-22-ctrl-date" data-id="' + curItem.id + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#program-22-ctrl-date"></use></svg>' + curItem.title + '</a>';
        }
        $('.program-22-ctrl-dates').html(newHTML);
        $('.program-22-ctrl-dates .program-22-ctrl-date').eq(0).addClass('active');

        newHTML = '<ul>';
        for (var i = 0; i < programm22Data.sections.length; i++) {
            var curItem = programm22Data.sections[i];
            newHTML += '<li><a href="#" data-id="' + curItem.id + '">' + curItem.title + '</a></li>';
        }
        newHTML += '</ul>';
        $('.program-22-sections').html(newHTML);
        $('.program-22-sections li').eq(0).addClass('active');

        updateProgram22();
        updateProgram22Count();
    });

    $('.program-22-container').mCustomScrollbar({
        axis: 'x',
        scrollButtons: {
            enable: true
        }
    });

    $('body').on('click', '.program-22-ctrl-date', function(e) {
       var curItem = $(this);
       if (!curItem.hasClass('active')) {
           $('.program-22-ctrl-date.active').removeClass('active');
           curItem.addClass('active');
           updateProgram22();
            updateProgram22Count();
       }
       e.preventDefault();
    });

    $('body').on('click', '.program-22-sections a', function(e) {
       var curItem = $(this).parent();
       if (!curItem.hasClass('active')) {
           $('.program-22-sections li.active').removeClass('active');
           curItem.addClass('active');
           updateProgram22();
            updateProgram22Count();
       }
       e.preventDefault();
    });

    $('body').on('change', '.programm-filter-window-checkboxes-speakers .form-checkbox input', function() {
        updateProgram22Disabled();
        updateProgrammFilter();
        updateProgram22Count();
    });

    $('body').on('change', '.programm-filter-window-checkboxes-types .form-checkbox input', function() {
        updateProgram22Disabled();
        updateProgrammFilter();
        updateProgram22Count();
    });

    $('body').on('click', '.programm-filter-param a', function(e) {
        updateProgram22Disabled();
        updateProgram22Count();
        e.preventDefault();
    });

});

function updateProgram22() {
    $('.program-22-ctrl').each(function() {
        $('.program-22-content').stop(true, true);
        $('.program-22-content').animate({'opacity': 0}, 300, function() {
            var newHTML = '';

            var curWeekID = $('.program-22-ctrl-date.active').attr('data-id');
            var curWeek = null;
            for (var i = 0; i < programm22Data.weeks.length; i++) {
                if (programm22Data.weeks[i].id == curWeekID) {
                    curWeek = programm22Data.weeks[i];
                }
            }
            for (var i = 0; i < curWeek.days.length; i++) {
                var curDay = curWeek.days[i];
                newHTML += '<div class="program-22-day"><div class="program-22-day-date">' + curDay.title + '</div><div class="program-22-day-name">' + curDay.name + '</div>';
                for (var j = 0; j < programm22Data.events.length; j++) {
                    var curEvent = programm22Data.events[j];
                    if (curEvent.date == curDay.date) {
                        var curSection = $('.program-22-sections li.active a').attr('data-id');
                        if (curSection == '' || curEvent.sections.indexOf(curSection) != -1) {

                            var activeEventSpeaker = false;
                            $('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').each(function() {
                                var curVal = $(this).val();
                                if (curVal != '0') {
                                    if (curEvent.speakers.indexOf(curVal) != -1) {
                                        activeEventSpeaker = true;
                                    }
                                } else {
                                    activeEventSpeaker = true;
                                }
                            });
                            if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length == 0) {
                                activeEventSpeaker = true;
                            }

                            var activeEventSections = false;
                            $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
                                var curVal = $(this).val();
                                if (curEvent.type == curVal) {
                                    activeEventSections = true;
                                }
                            });
                            if ($('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length == 0) {
                                activeEventSections = true;
                            }

                            var eventDisabledClass = '';
                            if (!(activeEventSpeaker && activeEventSections)) {
                                eventDisabledClass = ' disabled';
                            }
                            newHTML +=  '<a href="' + curEvent.url + '" class="program-22-event' + eventDisabledClass + '" target="_blank" data-id="' + curEvent.id + '">';
                            if (typeof(curEvent.photoprev) != 'undefined' && curEvent.photoprev && typeof(curEvent.photo) != 'undefined') {
                                newHTML +=  '<div class="program-22-event-photo"><img src="' + curEvent.photo + '" alt="" /></div>';
                            }
                            newHTML +=      '<div class="program-22-event-time">' + curEvent.time + '</div>' +
                                            '<div class="program-22-event-place">' + curEvent.place + '</div>';
                            for (var k = 0; k < programm22Data.types.length; k++) {
                                var curType = programm22Data.types[k];
                                if (curType.id == curEvent.type) {
                                    newHTML += '<div class="program-22-event-type"><span style="background-color:' + curType.color + '">' + curType.title + '</span></div>'
                                }
                            }
                            newHTML +=      '<div class="program-22-event-title">' + curEvent.title + '</div>';
                            if (typeof(curEvent.photo) != 'undefined' && (typeof(curEvent.photoprev) == 'undefined' || !curEvent.photoprev)) {
                                newHTML +=  '<div class="program-22-event-photo"><img src="' + curEvent.photo + '" alt="" /></div>';
                            }

                            newHTML +=  '</a>';
                        }
                    }
                }
                newHTML += '</div>';
            }
            $('.program-22-content').html(newHTML);
            $('.program-22-content').css({'top': '5px'});
            $('.program-22-content').animate({'opacity': 1, 'top': 0}, 300);
        });
    });
}

function updateProgram22Disabled() {
    $('.program-22-ctrl').each(function() {
        for (var j = 0; j < programm22Data.events.length; j++) {
            var curEvent = programm22Data.events[j];

            var activeEventSpeaker = false;
            $('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').each(function() {
                var curVal = $(this).val();
                if (curVal != '0') {
                    if (curEvent.speakers.indexOf(curVal) != -1) {
                        activeEventSpeaker = true;
                    }
                } else {
                    activeEventSpeaker = true;
                }
            });
            if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length == 0) {
                activeEventSpeaker = true;
            }

            var activeEventSections = false;
            $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
                var curVal = $(this).val();
                if (curEvent.type == curVal) {
                    activeEventSections = true;
                }
            });
            if ($('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length == 0) {
                activeEventSections = true;
            }

            if (activeEventSpeaker && activeEventSections) {
                $('.program-22-event[data-id="' + curEvent.id + '"]').removeClass('disabled');
            } else {
                $('.program-22-event[data-id="' + curEvent.id + '"]').addClass('disabled');
            }
        }
    });
}

function updateProgram22Count() {
    $('.program-22-ctrl').each(function() {

        $('.program-22-ctrl-date em').remove();
        if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length > 0 || $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length > 0) {
            for (var i = 0; i < programm22Data.weeks.length; i++) {
                var curCount = 0;
                var curWeek = programm22Data.weeks[i];
                for (var k = 0; k < curWeek.days.length; k++) {
                    var curDay = curWeek.days[k];
                    for (var j = 0; j < programm22Data.events.length; j++) {
                        var curEvent = programm22Data.events[j];
                        if (curEvent.date == curDay.date) {

                            var activeEventSpeaker = false;
                            $('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').each(function() {
                                var curVal = $(this).val();
                                if (curVal != '0') {
                                    if (curEvent.speakers.indexOf(curVal) != -1) {
                                        activeEventSpeaker = true;
                                    }
                                } else {
                                    activeEventSpeaker = true;
                                }
                            });
                            if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length == 0) {
                                activeEventSpeaker = true;
                            }

                            var activeEventSections = false;
                            $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
                                var curVal = $(this).val();
                                if (curEvent.type == curVal) {
                                    activeEventSections = true;
                                }
                            });
                            if ($('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length == 0) {
                                activeEventSections = true;
                            }

                            if (activeEventSpeaker && activeEventSections) {
                                curCount++;
                            }
                        }
                    }
                }
                if (curCount > 0) {
                    $('.program-22-ctrl-date[data-id="' + curWeek.id + '"]').append('<em>' + curCount + '</em>');
                }
            }
        }

        $('.program-22-sections em').remove();
        if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length > 0 || $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length > 0) {
            for (var i = 0; i < programm22Data.sections.length; i++) {
                var curCount = 0;
                var curSection = programm22Data.sections[i];
                var curWeekID = $('.program-22-ctrl-date.active').attr('data-id');
                var curWeek = null;
                for (var m = 0; m < programm22Data.weeks.length; m++) {
                    if (programm22Data.weeks[m].id == curWeekID) {
                        curWeek = programm22Data.weeks[m];
                    }
                }
                for (var k = 0; k < curWeek.days.length; k++) {
                    var curDay = curWeek.days[k];
                    for (var j = 0; j < programm22Data.events.length; j++) {
                        var curEvent = programm22Data.events[j];
                        if (curEvent.date == curDay.date) {
                            if (curSection.id == '' || curEvent.sections.indexOf(curSection.id) != -1) {

                                var activeEventSpeaker = false;
                                $('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').each(function() {
                                    var curVal = $(this).val();
                                    if (curVal != '0') {
                                        if (curEvent.speakers.indexOf(curVal) != -1) {
                                            activeEventSpeaker = true;
                                        }
                                    } else {
                                        activeEventSpeaker = true;
                                    }
                                });
                                if ($('.programm-filter-window-checkboxes-speakers .form-checkbox input:checked').length == 0) {
                                    activeEventSpeaker = true;
                                }

                                var activeEventSections = false;
                                $('.programm-filter-window-checkboxes-types .form-checkbox input:checked').each(function() {
                                    var curVal = $(this).val();
                                    if (curEvent.type == curVal) {
                                        activeEventSections = true;
                                    }
                                });
                                if ($('.programm-filter-window-checkboxes-types .form-checkbox input:checked').length == 0) {
                                    activeEventSections = true;
                                }

                                if (activeEventSpeaker && activeEventSections) {
                                    curCount++;
                                }
                            }
                        }
                    }
                }
                if (curCount > 0) {
                    $('.program-22-sections li a[data-id="' + curSection.id + '"]').append('<em>' + curCount + '</em>');
                }
            }
        }

    });
}