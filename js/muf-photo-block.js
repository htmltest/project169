// указывать абсолютный путь к файлам

(function() {
    var html = document.getElementsByTagName('html')[0];
    var body = document.getElementsByTagName('body')[0];
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/muf-photo-block.css';
    link.media = 'all';
    head.appendChild(link);


    var pathPhotos = [
        {
            'preview'   : 'files/muf-photo-block-1.jpg',
            'big'       : 'files/muf-photo-block-1-big.jpg',
            'date'      : '04.07.2019',
            'author'    : 'Шамуков Руслан',
            'place'     : 'г. Москва, Российская Федерация',
            'source'    : 'Фотохост-агентство ТАСС',
            'category'  : 'Деловая программа'
        },
        {
            'preview'   : 'files/muf-photo-block-2.jpg',
            'big'       : 'files/muf-photo-block-2-big.jpg',
            'date'      : '05.07.2019',
            'author'    : 'Шамуков Иван',
            'place'     : 'г. Санкт-Петербург, Российская Федерация',
            'source'    : 'Фотохост-агентство Лента',
            'category'  : 'Конференция'
        },
        {
            'preview'   : 'files/muf-photo-block-3.jpg',
            'big'       : 'files/muf-photo-block-3-big.jpg',
            'date'      : '06.07.2019',
            'author'    : 'Шамуков Петр',
            'place'     : 'г. Самара, Российская Федерация',
            'source'    : 'Фотохост-агентство Известия',
            'category'  : 'Деловая программа 3'
        },
        {
            'preview'   : 'files/muf-photo-block-4.jpg',
            'big'       : 'files/muf-photo-block-4-big.jpg',
            'date'      : '07.07.2019',
            'author'    : 'Шамуков Константин',
            'place'     : 'г. Новосибирск, Российская Федерация',
            'source'    : 'Фотохост-агентство Кремль',
            'category'  : 'Деловая программа 4'
        },
        {
            'preview'   : 'files/muf-photo-block-5.jpg',
            'big'       : 'files/muf-photo-block-5-big.jpg',
            'date'      : '08.07.2019',
            'author'    : 'Шамуков Михаил',
            'place'     : 'г. Краснодар, Российская Федерация',
            'source'    : 'Фотохост-агентство Дума',
            'category'  : 'Деловая программа 5'
        },
        {
            'preview'   : 'files/muf-photo-block-6.jpg',
            'big'       : 'files/muf-photo-block-6-big.jpg',
            'date'      : '09.07.2019',
            'author'    : 'Шамуков Григорий',
            'place'     : 'г. Владимир, Российская Федерация',
            'source'    : 'Фотохост-агентство Сенат',
            'category'  : 'Деловая программа 6'
        }
    ];

    var blockTitle = 'Фотографии мероприятия';
    var blockSubtitle = 'Фотобанк MUF';
    var blockLink = '#'

    var curBlock = document.getElementById('mufPhotoBlock');
    var newHTML =           '<div class="muf-photo-block">' +
                                '<div class="muf-photo-block-header">' +
                                    '<div class="muf-photo-block-header-title">' + blockTitle + '</div>' +
                                    '<div class="muf-photo-block-header-link"><a href="' + blockLink + '" target="_blank"><svg viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10547 23.625C3.45964 23.625 2.91797 23.4062 2.48047 22.9688C2.04297 22.5313 1.82422 22 1.82422 21.375V9.625C1.82422 9 2.04297 8.46875 2.48047 8.03125C2.91797 7.59375 3.45964 7.375 4.10547 7.375H15.8242C16.4492 7.375 16.9805 7.59375 17.418 8.03125C17.8555 8.46875 18.0742 9 18.0742 9.625V21.375C18.0742 22 17.8555 22.5313 17.418 22.9688C16.9805 23.4062 16.4492 23.625 15.8242 23.625H4.10547ZM4.10547 21.75H15.8242C15.9284 21.75 16.0171 21.7083 16.0905 21.625C16.163 21.5417 16.1992 21.4583 16.1992 21.375V9.625C16.1992 9.54167 16.163 9.45833 16.0905 9.375C16.0171 9.29167 15.9284 9.25 15.8242 9.25H4.10547C4.0013 9.25 3.90755 9.29167 3.82422 9.375C3.74089 9.45833 3.69922 9.54167 3.69922 9.625V21.375C3.69922 21.4583 3.74089 21.5417 3.82422 21.625C3.90755 21.7083 4.0013 21.75 4.10547 21.75ZM5.26172 19.0938H14.668L11.6992 15.125L9.32422 18.25L7.57422 15.9375L5.26172 19.0938ZM21.3555 23.625V7.375H23.2305V23.625H21.3555ZM26.5117 23.625V7.375H28.3867V23.625H26.5117Z" /></svg>' + blockSubtitle + '</a></div>' +
                                '</div>' +
                                '<div class="muf-photo-block-container">';
    for (var i = 0; i < pathPhotos.length; i++) {
        var curPhoto = pathPhotos[i];
        newHTML +=                  '<div class="muf-photo-block-item"><a href="' + curPhoto.big + '" class="muf-photo-block-item-link" data-id="' + i + '" target="_blank"><div class="muf-photo-block-item-inner" style="background-image:url(' + curPhoto.preview + ')"></div></a></div>';
    }

    newHTML +=                  '</div>' +
                            '</div>';

    curBlock.innerHTML = newHTML;

    var curScroll = 0;

    var items = document.getElementsByClassName('muf-photo-block-item-link');

    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function(e) {
            var curLink = this;
            var curID = Number(curLink.getAttribute('data-id'));

            curScroll = html.scrollTop;
            html.classList.add('muf-photo-window-photo-open');

            var curPhoto = pathPhotos[curID];
            var curData =   '<div class="muf-photo-event-photos-item-data-list">' +
                                '<div class="muf-photo-event-photos-item-data-list-row">' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-name">Дата съемки:</div>' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-value">' + curPhoto.date + '</div>' +
                                '</div>' +
                                '<div class="muf-photo-event-photos-item-data-list-row">' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-name">Автор:</div>' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-value">' + curPhoto.author + '</div>' +
                                '</div>' +
                                '<div class="muf-photo-event-photos-item-data-list-row">' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-name">Место:</div>' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-value">' + curPhoto.place + '</div>' +
                                '</div>' +
                                '<div class="muf-photo-event-photos-item-data-list-row">' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-name">Источник:</div>' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-value">' + curPhoto.source + '</div>' +
                                '</div>' +
                                '<div class="muf-photo-event-photos-item-data-list-row">' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-name">Категории:</div>' +
                                    '<div class="muf-photo-event-photos-item-data-list-row-value">' + curPhoto.category + '</div>' +
                                '</div>' +
                            '</div>';

            var windowHTML =    '<div class="muf-photo-window-photo">';
            windowHTML +=           '<a href="#" class="muf-photo-window-photo-close"><svg viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16 1L1 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M1 1L16 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></a>';
            windowHTML +=           '<div class="muf-photo-window-photo-slider-list-item">' +
                                        '<div class="muf-photo-window-photo-slider-list-item-inner"><img src="' + curPhoto.big + '" alt="" /></div>' +
                                        '<div class="muf-photo-window-photo-slider-list-item-data">' + curData + '</div>' +
                                    '</div>';
            windowHTML +=       '</div>';

            var div = document.createElement('div');
            div.innerHTML = windowHTML;
            body.appendChild(div);

            var curWindowItem = document.getElementsByClassName('muf-photo-window-photo-slider-list-item')[0];
            var curWindowItemData = document.getElementsByClassName('muf-photo-window-photo-slider-list-item-data')[0];
            var curHeight = curWindowItem.offsetHeight - curWindowItemData.offsetHeight;
            var curWindowItemInner = document.getElementsByClassName('muf-photo-window-photo-slider-list-item-inner')[0];
            curWindowItemInner.style.height = curHeight + 'px';
            curWindowItemInner.style.lineHeight = curHeight + 'px';

            var closeBTN = document.getElementsByClassName('muf-photo-window-photo-close')[0];
            closeBTN.addEventListener('click', function(e) {
                var windowPhoto = document.getElementsByClassName('muf-photo-window-photo')[0];
                windowPhoto.parentNode.removeChild(windowPhoto);
                html.classList.remove('muf-photo-window-photo-open');
                html.scrollTop = curScroll;

                e.preventDefault();
            });

            e.preventDefault();
        });
    }

}) ();