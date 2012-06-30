define(['lib/zepto', 'data', 'status', 'editor/dialog', 'editor/layer'],
        function ($, data, status, dialogMod, layerMod) {
    var Mod = function (page, name, prop, title) {
        var that = this;
        that.key = prop;

        function build(value, title) {
            var li = $('<li><span class="title"></span>: <button>Edit</button></li>');
            li.find('.title').text(title);
            li.find('button').click(function () {
                status.prop = prop;
                dialogMod.init('img', title);
            });
            that.li = li;
        }

        that.update = function (value) {
            ;
        };
        that.remove = function () {
            that.li.remove();
        };

        var value = data.get(page).getItem(name).getProp(prop);
        build(value, title);
    };
    return Mod;
});