define(['lib/zepto'], function ($) {
    var mod = {
        editorConfig: {display: 'dialog', dialog: 'img'},
        propList: [{key: '-val-img', title: '图片'}],
        render: function (item, itemData) {
            var src = itemData.getValue();
            if (!src) {
                item.html('[no img]');
                return;
            }
            var img = $('<img>').
                attr('src', src).
                css('max-width', '100%').
                css('max-height', '100%').
                bind('error', function (e) {
                    img.remove();
                });
            item.empty().append(img);
        }
    };
    return mod;
});