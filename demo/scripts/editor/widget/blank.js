define(['lib/zepto'], function ($) {
    var mod = {
        editorConfig: {},
        propList: [],
        render: function (item, itemData) {
            item.html('');
        }
    };
    return mod;
});