define({
    build: function (layerRoot) {
        var that = this;
        layerRoot.html('<textarea style="width: 100%; height: 100%;"></textarea>');
        var textarea = layerRoot.find('textarea');
        textarea.bind('blur', function (e) {
            var value = that.val(layerRoot);
            that.onsubmit && that.onsubmit(value);
        });
    },
    show: function (layerRoot) {
        layerRoot.find('textarea').focus();
    },
    update: function (layerRoot, value) {
        layerRoot.find('textarea').val(value);
    },
    remove: function (layerRoot) {
        layerRoot.html('');
    },
    val: function (layerRoot) {
        return layerRoot.find('textarea').val();
    }
});