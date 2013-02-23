define(['lib/zepto', 'data', 'status'], function ($, data, status) {
    var layerRoot = $('#item-layer');

    function build(title) {
        layerRoot.html('<textarea style="width: 100%; height: 100%;"></textarea>');
        var textarea = layerRoot.find('textarea');
        textarea.bind('blur', function (e) {
            var value = val();
            mod.onsubmit && mod.onsubmit(value);
        });
        update(data.get(status.page).getItem(status.name).getProp(status.prop));
        setTimeout(function () {
            textarea.focus();
        }, 13);
    }
    function update(value) {
        layerRoot.find('textarea').val(value);
    }
    function clear() {
        layerRoot.html('');
    }
    function val() {
        return layerRoot.find('textarea').val();
    }

    var mod = {
        build: build,
        update: update,
        clear: clear,
        val: val
    };

    return mod;
});