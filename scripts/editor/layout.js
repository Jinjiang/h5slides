define(['lib/zepto', 'data', 'status'], function ($, data, status) {
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

    function build() {
        list.empty();
        $.each(LAYOUT_ARRAY, function (index, layout) {
            var li = $('<li></li>').
                attr('title', layout.title).
                attr('data-key', layout.key);
            list.append(li);
        });
    }

    function init() {
        var currentSlide = data.get(status.page);
        update(currentSlide.getLayout());
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

    build();

    list.delegate('li', 'click', function () {
        if ($(this).hasClass('current')) {
            return;
        }
        var key = $(this).attr('data-key');
        update(key);
        data.get(status.page).setLayout(key);
        mod.onlayoutchange && mod.onlayoutchange(status.page, key);
    });

    var mod = {
        init: init,
        update: update
    };

    return mod;
});