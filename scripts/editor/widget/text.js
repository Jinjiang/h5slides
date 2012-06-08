define(['lib/zepto'], function ($) {
    var mod = {
        editorConfig: {display: 'layer', layer: 'text'},
        propList: [{key: 'color', title: '颜色'}, {key: '-val-text', title: '文本'}],
        render: function (item, itemData) {
            item.text(itemData.value);
        }
    };
    return mod;
});