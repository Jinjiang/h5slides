define(['lib/zepto', 'data'], function ($, data) {
    var LAYOUT_ARRAY = [
        {"key": "title", "title": "大标题"},
        {"key": "subtitle", "title": "章节标题"},
        {"key": "normal", "title": "正文"},
        {"key": "double", "title": "两列"},
        {"key": "double-subtitle", "title": "两列带副标题"}
    ];

    var root = $('#panel-layout');
    var list = $('#panel-layout-list');

    var current;
    var currentPage;

    function init() {
        list.empty();
        $.each(LAYOUT_ARRAY, function (index, layout) {
            var li = $('<li></li>').
                attr('title', layout.title).
                attr('data-key', layout.key);
            list.append(li);
        });
    }

    function update(page, key) {
        currentPage = page;
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
        update(currentPage, key);
        data.get(currentPage).setLayout(key);
        mod.onlayoutchange && mod.onlayoutchange(key);
    });

    var mod = {
        update: update
    };

    return mod;
});