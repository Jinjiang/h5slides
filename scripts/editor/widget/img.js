define(['lib/zepto'], function ($) {
    var mod = {
        editorConfig: {display: 'dialog', dialog: 'img'},
        propList: [{key: '-val-img', title: '图片'}],
        render: function (item, itemData) {
            var config = itemData.getConfig();
            if (!config || !config['img-src']) {
                return;
            }
            var img = $('<img>').
                attr('alt', itemData.getValue()).
                attr('src', config['img-src']).
                css('max-width', '100%').
                css('max-height', '100%');
            item.empty().append(img);
        }
    };
    return mod;
});