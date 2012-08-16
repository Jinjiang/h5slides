define(['lib/zepto'], function ($) {

    var REGEXP_URL = /(https?:\/\/[\w-]*(?:\.[\w-]*)+\/?[^\s\u4e00-\u9fa5]*)/ig;
    // var test = 'd 的http://www.baidu.com/asdfasdf?asdfasdf#afdsadf的'.
    //         replace(REGEXP_URL, '<a href="$1">$1</a>');
    // console.log(test);

    function parseText2Html(text) {
        return (text || '').replace(/\&/g, '&amp;').
                replace(/\</g, '&lt;').
                replace(/\>/g, '&gt;').
                replace(/\n/g, '<br>');
    }

    function parseLinkFromHtml(html) {
        return html.replace(REGEXP_URL, '<a href="$1">$1</a>');
    }

    var mod = {
        editorConfig: {display: 'layer', layer: 'text'},
        propList: [{key: 'color', title: '颜色'}/*, {key: '-val-text', title: '文本'}*/],
        render: function (item, itemData) {
            var value = itemData.getValue();
            if (value) {
                item.html(parseLinkFromHtml(parseText2Html(value)));
            }
            else {
                item.html('');
            }
        },
        preview: function (item, itemData) {
            var value = itemData.getValue();
            if (value) {
                item.html(parseText2Html(value));
            }
            else {
                item.html('[请双击填入文字]');
            }
        }
    };
    return mod;
});