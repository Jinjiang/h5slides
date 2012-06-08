define(['lib/zepto'], function ($) {
    return {
        offset: function (name) {
            var item;

            if (name && name !== 'slide') {
                item = $('#slide-' + name);
            }
            if (!item) {
                item = $('#slide');
            }

            return item.offset();
        }
    }
});