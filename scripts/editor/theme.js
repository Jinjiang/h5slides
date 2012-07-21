define(['lib/zepto', 'data', 'status', 'stylesheet'], function ($, data, status, stylesheet) {
    var THEME_ARRAY = [
        {"key": "blank", "title": "默认"}
    ];

    var root = $('#panel-themes');
    var list = $('#panel-themes-list');

    var current;

    function build() {
        list.empty();
        $.each(THEME_ARRAY, function (index, theme) {
            var imageSrc = 'css/theme/' + theme.key + '/logo.png';
            var li = $('<li><img /></li>').
                attr('title', theme.title).
                attr('data-key', theme.key);
            li.find('img').
                attr('src', imageSrc).
                attr('alt', theme.title);
            list.append(li);
        });
    }

    function init() {
        update(data.getTheme());
    }

    function update(key) {
        stylesheet.load('theme', key);
        list.find('li').each(function (index, item) {
            item = $(item);
            if (item.attr('data-key') == key) {
                if (current) {
                    current.removeClass('current');
                }
                item.addClass('current');
                current = item;
            }
        });
    }

    build();

    list.delegate('li', 'click', function () {
        if ($(this).hasClass('current')) {
            return;
        }
        var key = $(this).attr('data-key');
        update(key);
        data.setTheme(key);
        mod.onthemechange && mod.onthemechange(key);
    });

    var mod = {
        init: init,
        update: update
    };

    return mod;
});