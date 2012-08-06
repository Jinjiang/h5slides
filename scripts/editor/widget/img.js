define(['lib/zepto'], function ($) {
    var mod = {
        editorConfig: {display: 'dialog', dialog: 'img'},
        propList: [{key: '-val-img', title: '图片'}],
        render: function (item, itemData) {
            var src = itemData.getValue();
            if (!src) {
                item.html('');
                return;
            }
            var img = $('<img>').
                attr('src', src).
                css('display', 'block').
                css('margin', 'auto').
                css('max-width', '100%').
                css('max-height', '100%').
                bind('error', function (e) {
                    img.remove();
                });
            item.empty().append(img);
        },
        preview: function (item, itemData) {
            var src = itemData.getValue();
            if (!src) {
                item.html('<span style="font-style: italic;">无图无真相 :-(<br>请双击后编辑</span>');
                return;
            }
            var img = $('<img>').
                attr('src', src).
                css('display', 'block').
                css('margin', 'auto').
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