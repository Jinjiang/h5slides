define(['lib/zepto', 'editor/dialog', 'editor/layer'], function ($, dialogMod, layerMod) {
    var Mod = function (value, title) {
        var that = this;
        function build(value, title) {
            var li = $('<li><span class="title"></span>: <button>Edit</button></li>');
            li.find('.title').text(title);
            li.find('button').click(function () {
                layerMod.setType('text');
                // layerMod.update(value, title);
                // layerMod.update(name, itemData.getValue(), title);
                layerMod.show();
            });
            that.li = li;
        }
        that.remove = function () {
            that.li.remove();
        };
        build(value, title);
    };
    return Mod;
});