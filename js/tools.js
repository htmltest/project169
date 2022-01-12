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

    $('.welcome-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#welcome-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#welcome-next"></use></svg></button>',
        dots: true
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
        windowHTML +=                   '<a href="#" class="window-video-social-item window-video-social-item-fb"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-fb"></use></svg></a>';
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
        if ($(e.target).parents().filter('.programm-filter').length == 0 && $(e.target).parents().filter('.programm-filter-window-block-params-item').length == 0) {
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
        paramsHTML += '<div class="programm-filter-param">' + curInput.parent().find('span').html() + '<a href="#" data-type="checkbox" data-name="' + curInput.attr('name') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#programm-filter-param-remove"></use></svg></a></div>';
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
        $('.programm-filter-params').css({'width': ($('.programm-ctrl').width() - $('.programm-dates').width() - $('.programm-filter-btn').width() - 70) + 'px'});
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