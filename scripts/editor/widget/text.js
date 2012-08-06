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
                item.html('');
            }
        },
        preview: function (item, itemData) {
            var value = itemData.getValue();
            if (value) {
                item.text(value);
            }
            else {
                item.html('[请双击填入文字]');
            }
        }
    };
    return mod;
});