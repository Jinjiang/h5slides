define(['lib/zepto'], function ($) {

    var OFFSET_KEYS = ['left', 'top', 'width', 'height'];

    function getItem(name) {
        var item;

        if (name && name !== 'slide') {
            item = $('#slide-' + name);
        }
        if (!item) {
            item = $('#slide');
        }

        return item;
    }

    return {
        offset: function (name) {
            var item = getItem(name);

            return item.offset();
        },
        move: function (name, offset) {
            var item = getItem(name);

            OFFSET_KEYS.forEach(function (key) {
                if (offset[key]) {
                    item.css(key, offset[key]);
                }
            });
        }
    }
});