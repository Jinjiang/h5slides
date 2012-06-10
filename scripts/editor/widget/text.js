define(['lib/zepto'], function ($) {
    var mod = {
        editorConfig: {display: 'layer', layer: 'text'},
        propList: [{key: 'color', title: '颜色'}/*, {key: '-val-text', title: '文本'}*/],
        render: function (item, itemData) {
            var value = itemData.getValue();
            if (value) {
                item.text(value);
            }
            else {
                item.html('[no text]')
            }
        }
    };
    return mod;
});