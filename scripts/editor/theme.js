define(['lib/zepto', 'data'], function ($, data) {
    var THEME_ARRAY = [
        {"key": "blank", "title": "默认"}
    ];

    var root = $('#panel-themes');
    var list = $('#panel-themes-list');

    var current;

    function init() {
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

    function update(key) {
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

    init();

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
        update: update
    };

    return mod;
});